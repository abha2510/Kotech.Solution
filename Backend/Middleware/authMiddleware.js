const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "No token provided, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        req.user = { id: decoded.id, username: decoded.username }; 
        next();
    } catch (error) {
        console.error("Token verification failed", error);
        return res.status(401).json({ message: "Token is not valid" });
    }
};

module.exports = { authMiddleware };
