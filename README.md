Todo List App with React, Local Storage, and AWS Authentication

This is a simple Todo List app built using React. The app allows users to manage their tasks (add, update, delete) and persists their tasks using localStorage. Additionally, the app integrates AWS Cognito for user authentication, ensuring that only authenticated users can access their tasks.

Features

User Authentication: Sign in using AWS Cognito for secure user access.

CRUD Operations: Add, delete, and update tasks.

LocalStorage: Tasks are saved in localStorage to persist even after refreshing the page.

Responsive: The app is mobile-friendly and works across different devices.

Tech Stack

Frontend: React.js

Authentication: AWS Cognito (via AWS Amplify)

Persistence: localStorage

Styling: CSS

Usage

Add a Task: Enter a task name and click "Add Task" to add it to the list.

Update Task: Mark tasks as completed or not completed by toggling the checkbox.

Delete Task: Click the delete button to remove a task from the list.

AWS Authentication: Sign in with your AWS Cognito credentials to access the Todo list.