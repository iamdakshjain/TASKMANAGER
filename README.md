# TASKMANAGER
 This is a Task Manager application built using Flask for the backend ,MySQl for database and React for the frontend. The application allows users to manage their tasks by adding, updating, deleting, and marking tasks as completed.

# Prerequisites
Docker installed on your machine. You can download and install Docker from here "https://www.docker.com/products/docker-desktop/".

# Getting Started
Clone this repository to your local machine:
git clone https://github.com/iamdakshjain/TASKMANAGER

# Navigate to the project directory:
cd task-manager

# Build the Docker images for the backend and frontend:
bash
Copy code
docker-compose build

# Start the Docker containers:
bash
Copy code
docker-compose up

# Access the Task Manager application in your web browser:

Frontend: http://localhost:3000
Backend: http://localhost:5000

# Usage
Once the application is running, you can use the frontend to interact with the Task Manager.
Add tasks by entering a title, description then click "Add Task".
Update tasks by clicking the "Update" button next to the task, make the necessary changes, and click "Update".
Delete tasks by clicking the "Delete" button next to the task.
Mark tasks as completed by clicking the "Done" button.

# Contributing
Contributions are welcome! If you find any issues or would like to contribute to the project, feel free to open an issue or create a pull request.
