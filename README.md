# Kotech Solutions Whiteboard Project
## Overview
The Kotech Solutions Whiteboard Project is a real-time collaborative whiteboard application. It allows users to register, login, create a session, and join a shared session to draw on the same canvas. The application uses Express for the backend, MongoDB for storing user data and sessions, and Socket.io for real-time communication.

This repository includes both the frontend and backend components:

Backend: Node.js with Express, MongoDB for user and session management, and Socket.io for real-time collaboration.
Frontend: React with Axios for handling user registration, login, and interacting with the backend, including a drawing whiteboard feature.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Socket.io
- JWT Authentication
- Bcrypt for password hashing

## Project Structure
The project is structured as follows:

- **Config**: Contains the database configuration.
- **Models**: Contains Mongoose schemas for User and Session models.
- **Routes**: Contains routes for user and session management.
- **Middleware**: Contains authentication middleware.
- **Server**: The main server setup with Socket.io for real-time communication.


## API Endpoints

### User Routes
- **POST /users/register** - Registers a new user. Requires `username` and `password`.
- **POST /users/login** - Logs in an existing user. Requires `username` and `password`.

### Session Routes
- **POST /sessions** - Creates a new session. Requires JWT token in authorization header.
- **GET /sessions/:id** - Fetches a session by ID. Requires JWT token in authorization header.

## Socket.io Integration
The backend uses Socket.io for real-time collaboration on the whiteboard. Users can join a session, draw, and erase in real-time.

## Frontend Technologies Used
- React.js
- React Router
- Axios for HTTP requests
- Socket.io client for real-time communication

## Project Structure (Frontend)
The frontend is structured as follows:

- **Components**: Contains reusable UI components such as buttons, forms, and modals.
- **Pages**: Contains page components like Login, Register, Home, and Session.
- **Services**: Contains services for API calls (e.g., Axios instance configuration).
- **Redux**: (If using) Contains actions, reducers, and store configuration.
- **Socket**: Contains real-time communication setup with Socket.io client.

## Frontend Flow
1. Users can register and log in via forms, with data sent to the backend API.
   
![Screenshot 2024-12-17 190844](https://github.com/user-attachments/assets/583129cd-b81e-40c4-9e18-38bb0d1ba319)

3. Once logged in, users can join a session and interact with the whiteboard in real-time.
   
![Screenshot 2024-12-17 190828](https://github.com/user-attachments/assets/c3886331-3508-4287-8e0c-cc748063ccca)

5. Real-time updates are handled through Socket.io, enabling users to draw, erase, and collaborate instantly.
   
![Screenshot 2024-12-17 190716](https://github.com/user-attachments/assets/c9fd7548-1efe-449d-b1fd-13b77cd2a684)




