# Maze Generator & Pathfinding Visualizer

This is a web-based, interactive application that generates complex mazes and visualizes various pathfinding algorithms as they solve them. It's built with pure JavaScript, HTML Canvas, and styled with Tailwind CSS.

This project was built to demonstrate and visually compare different approaches to pathfinding, from simple "blind" searches to more complex, heuristic-based algorithms.

!

---

## Features

* **Complex Maze Generation:** Uses **Kruskal's Algorithm** (with an "imperfection" step) to generate complex mazes with multiple possible paths and loops, not just a single solution.
* **Multiple Solving Algorithms:** Choose between three classic pathfinding algorithms to see how they perform:
    * **A\* Search:** A "smart" heuristic-based algorithm that prioritizes paths heading toward the goal. *Guarantees the shortest path.*
    * **Breadth-First Search (BFS):** A "flood-fill" algorithm that explores equally in all directions. *Guarantees the shortest path.*
    * **Depth-First Search (DFS):** An algorithm that explores one path to its absolute end before backtracking. *Finds a path, but not necessarily the shortest.*
* **Step-by-Step Visualization:** Watch the algorithms work in real-time. The "visited" cells are colored in, showing the exploration process for each algorithm.
* **Dynamic Visuals:**
    * Clean, responsive UI styled with Tailwind CSS.
    * Polished "3D" inset wall effect for depth.
    * Custom SVG icons for the start (arrow) and end (trophy) points.
    * A pulsing animation on the final, shortest path.
* **Customizable Mazes:** Easily change the width and height of the maze to generate new challenges.

---

## How to Use

1.  Open the `code.html` file in any modern web browser.
2.  (Optional) Adjust the `Width` and `Height` in the control panel.
3.  Click **"Generate Maze"** to create a new, random maze.
4.  Select an algorithm from the **"Algorithm"** dropdown.
5.  Click **"Solve Maze"** to watch the selected algorithm find the solution.

---

## Technologies Used

* **HTML5:** For the core structure.
* **HTML Canvas:** For rendering the maze, the solving animation, and all visual effects.
* **JavaScript (ES6+):** For all logic, including maze generation, pathfinding algorithms, and DOM manipulation.
* **Tailwind CSS:** For all styling and the responsive UI.

---

## Contributing

Contributions are welcome! If you have suggestions for new features, improvements, or bug fixes, please feel free to:

1.  **Fork the repository** on GitHub.
2.  **Create a new branch** for your changes (`git checkout -b feature/your-awesome-feature`).
3.  **Make your changes** and commit them (`git commit -m 'Add some awesome feature'`).
4.  **Push your branch** to your fork (`git push origin feature/your-awesome-feature`).
5.  **Open a Pull Request** to the main repository.

Please make sure your code is well-commented and follows the existing style.

---

## License

This project is licensed under the **MIT License**.

See the `LICENSE.md` file for more details.

---

## About the Author

This project was created by **[Kunal Gupta]**.

* **GitHub:** `github.com/Commander-Kunal`
* **LinkedIn:** `linkedin.com/in/commander-kunal`
* MCA Data Science Student at University Institute of Computing (UIC), Chandigarh University, Mohali, Punjab – 140301
* **UID:** 25MCD10013
* **Semester/Year:** 2/1
