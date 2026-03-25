const taskNameInput = document.getElementById('taskName');
const taskPriorityInput = document.getElementById('taskPriority');
const taskDeadlineInput = document.getElementById('taskDeadline');
const addTaskBtn = document.getElementById('addTaskBtn');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const taskList = document.getElementById('taskList');
const filterButtons = Array.from(document.querySelectorAll('.btn-filter'));

const totalCount = document.getElementById('totalCount');
const completedCount = document.getElementById('completedCount');
const pendingCount = document.getElementById('pendingCount');

const priorityRank = { High: 3, Medium: 2, Low: 1 };
let tasks = [];
let currentFilter = 'all';
let currentSort = 'none';
let searchTerm = '';

function debounce(fn, delay = 300) {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => fn(...args), delay);
	};
}

function createTask() {
	const name = taskNameInput.value.trim();
	const priority = taskPriorityInput.value;
	const deadline = taskDeadlineInput.value;

	if (!name) {
		taskNameInput.focus();
		taskNameInput.classList.add('is-invalid');
		return;
	}

	taskNameInput.classList.remove('is-invalid');

	tasks.push({
		id: Date.now() + Math.floor(Math.random() * 1000),
		name,
		priority,
		deadline,
		completed: false,
		createdAt: new Date().toISOString()
	});

	taskNameInput.value = '';
	taskPriorityInput.value = 'Medium';
	taskDeadlineInput.value = '';
	renderTasks();
}

function toggleTask(taskId) {
	tasks = tasks.map((task) =>
		task.id === taskId ? { ...task, completed: !task.completed } : task
	);
	renderTasks();
}

function deleteTask(taskId) {
	tasks = tasks.filter((task) => task.id !== taskId);
	renderTasks();
}

function isOverdue(deadline, completed) {
	if (!deadline || completed) {
		return false;
	}
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const dueDate = new Date(deadline + 'T00:00:00');
	return dueDate < today;
}

function updateCounters() {
	const total = tasks.length;
	const completed = tasks.filter((task) => task.completed).length;
	const pending = total - completed;

	totalCount.textContent = total;
	completedCount.textContent = completed;
	pendingCount.textContent = pending;
}

function applyFilterAndSort(taskItems) {
	let result = taskItems.filter((task) =>
		task.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	if (currentFilter === 'completed') {
		result = result.filter((task) => task.completed);
	} else if (currentFilter === 'pending') {
		result = result.filter((task) => !task.completed);
	}

	if (currentSort === 'priority') {
		result.sort((a, b) => priorityRank[b.priority] - priorityRank[a.priority]);
	} else if (currentSort === 'deadline') {
		result.sort((a, b) => {
			const aTime = a.deadline ? new Date(a.deadline + 'T00:00:00').getTime() : Number.MAX_SAFE_INTEGER;
			const bTime = b.deadline ? new Date(b.deadline + 'T00:00:00').getTime() : Number.MAX_SAFE_INTEGER;
			return aTime - bTime;
		});
	}

	return result;
}

function priorityBadgeClass(priority) {
	if (priority === 'High') return 'bg-danger';
	if (priority === 'Medium') return 'bg-warning text-dark';
	return 'bg-success';
}

function renderTasks() {
	const processedTasks = applyFilterAndSort([...tasks]);
	updateCounters();

	if (!processedTasks.length) {
		taskList.innerHTML = `
			<div class="alert alert-light border mb-0" role="alert">
				No tasks found. Add a task or adjust search/filter.
			</div>
		`;
		return;
	}

	taskList.innerHTML = processedTasks.map((task) => {
		const overdue = isOverdue(task.deadline, task.completed);
		return `
			<article class="card task-item shadow-sm ${overdue ? 'border border-danger' : 'border-0'}">
				<div class="card-body d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
					<div class="d-flex align-items-start gap-3">
						<input
							class="form-check-input mt-1"
							type="checkbox"
							aria-label="Mark task as completed"
							${task.completed ? 'checked' : ''}
							onchange="toggleTask(${task.id})"
						>
						<div>
							<h3 class="h6 mb-1 task-name ${task.completed ? 'text-decoration-line-through text-muted' : ''}">${task.name}</h3>
							<div class="d-flex flex-wrap gap-2">
								<span class="badge ${priorityBadgeClass(task.priority)}">${task.priority}</span>
								<span class="badge text-bg-light border ${overdue ? 'overdue' : ''}">
									${task.deadline ? `Due: ${task.deadline}` : 'No deadline'}
								</span>
								${task.completed ? '<span class="badge text-bg-success">Completed</span>' : '<span class="badge text-bg-secondary">Pending</span>'}
							</div>
						</div>
					</div>
					<button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">Delete</button>
				</div>
			</article>
		`;
	}).join('');
}

const debouncedSearch = debounce((value) => {
	searchTerm = value;
	renderTasks();
}, 300);

const debouncedFilter = debounce((filterValue) => {
	currentFilter = filterValue;
	filterButtons.forEach((btn) => {
		btn.classList.toggle('active', btn.dataset.filter === filterValue);
	});
	renderTasks();
}, 300);

addTaskBtn.addEventListener('click', createTask);

taskNameInput.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		event.preventDefault();
		createTask();
	}
});

searchInput.addEventListener('input', (event) => {
	debouncedSearch(event.target.value.trim());
});

filterButtons.forEach((button) => {
	button.addEventListener('click', () => debouncedFilter(button.dataset.filter));
});

sortSelect.addEventListener('change', (event) => {
	currentSort = event.target.value;
	renderTasks();
});

window.toggleTask = toggleTask;
window.deleteTask = deleteTask;

renderTasks();
