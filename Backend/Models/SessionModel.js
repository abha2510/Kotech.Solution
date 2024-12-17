const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    sessionId: { type: String, required: true, unique: true },
    canvasState: { type: Array, default: [] },
    users: [{ type: String }],
}, { versionKey: false }
)

const SessionModel = mongoose.model('Session', sessionSchema);

module.exports = { SessionModel };