const express = require('express');
const { SessionModel } = require('../Models/SessionModel');
const { authMiddleware } = require('../Middleware/authMiddleware');
const { v4: uuidv4 } = require('uuid');
const sessionRouter = express.Router();


sessionRouter.post('/', authMiddleware, async (req, res) => {
  const sessionId = uuidv4(); 
  if (!req.user || !req.user.username) {
      return res.status(400).json({ error: 'User not authenticated properly' });
  }
  try {
      const session = await SessionModel.create({ sessionId, users: [req.user.username] });
      res.status(201).json({ message: 'Session created', sessionId, session });
  } catch (error) {
      res.status(400).json({ error: 'Session creation failed' });
  }
});

  
  
  sessionRouter.get('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
      const session = await SessionModel.findOne({ sessionId: id });
      if (!session) {
        return res.status(404).json({ error: 'Session not found' });
      }
      res.json(session);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch session' });
    }
  });

module.exports = {sessionRouter};
