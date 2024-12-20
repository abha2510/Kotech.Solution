const express = require('express');
const cors = require('cors');
require("dotenv").config();
const { connection } = require("./Config/db");
const { userRouter } = require('./Routes/authRoutes');
const { sessionRouter } = require('./Routes/sessionRoutes');
const http = require('http');
const { Server } = require('socket.io'); 
const sessions = {}; 
const app = express();
app.use(express.json());


const corsOptions = {
    origin: ['https://kotech-solution-g7ia.vercel.app', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With'
};
app.use(cors(corsOptions));


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});


io.on('connection', (socket) => {
    socket.on('joinSession', async (sessionId, username) => {
        if (!sessions[sessionId]) {
            sessions[sessionId] = { users: [], canvasState: [] };
        }
        if (!sessions[sessionId].users.includes(username)) {
            sessions[sessionId].users.push(username);
        }
        socket.join(sessionId);

        io.to(sessionId).emit('userJoined', { username, users: sessions[sessionId].users });
        socket.emit('loadCanvasState', sessions[sessionId].canvasState);
        socket.on('disconnect', () => {
            sessions[sessionId].users = sessions[sessionId].users.filter((user) => user !== username);
            io.to(sessionId).emit('userLeft', { username, users: sessions[sessionId].users });
        });
    });
});


app.get("/", (req, res) => {
    res.send("Hello from Kotech.Solutions!");
});
app.use('/users', userRouter);
app.use('/sessions', sessionRouter);


const PORT = process.env.PORT || 3000;
server.listen(PORT, async () => {
    try {
        await connection;
        console.log(`Server running on port ${PORT}`);
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
    }
});
