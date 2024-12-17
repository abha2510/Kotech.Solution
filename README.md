# Kotech Solutions 

Visit :https://kotech-solution-g7ia.vercel.app/

## Backend 
This project is a backend solution for Kotech Solutions. It includes features such as user authentication, session management, and a real-time whiteboard application using Socket.io.

### Technologies Used
- Node.js
- Express.js
- MongoDB
- Socket.io
- JWT Authentication
- Bcrypt for password hashing

### Project Structure
The project is structured as follows:

- **Config**: Contains the database configuration.
- **Models**: Contains Mongoose schemas for User and Session models.
- **Routes**: Contains routes for user and session management.
- **Middleware**: Contains authentication middleware.
- **Server**: The main server setup with Socket.io for real-time communication.

## Frontend 
- React.js
- React Router
- Axios for HTTP requests
- Socket.io client for real-time communication

### Project Structure (Frontend)
The frontend is structured as follows:

- **Components**: Contains reusable UI components such as buttons, forms, and modals.
- **Pages**: Contains page components like Login, Register and Whiteboard.
- **Socket**: Contains real-time communication setup with Socket.io client.

### Frontend Flow
1. Users can register and log in via forms, with data sent to the backend API.
 ![image](https://github.com/user-attachments/assets/bf084a40-404e-419c-b716-d848102665fd)

2. Once logged in, users can join a session and interact with the whiteboard in real-time.
   ![image](https://github.com/user-attachments/assets/f74c5c75-ef1e-41f6-ae69-f18395e886ce)

3. Real-time updates are handled through Socket.io, enabling users to draw, erase, and collaborate instantly.
   ![image](https://github.com/user-attachments/assets/b50f6038-14c4-4ce7-b62a-65a12b296303)


