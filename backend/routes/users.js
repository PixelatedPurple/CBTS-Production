const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Middleware to authenticate token
function authenticateToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied, no token provided.' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token.' });
        req.user = user;
        next();
    });
}

// Get current user profile
router.get('/me', authenticateToken, async (req, res) => {
    try {
        const [rows] = await req.db.query('SELECT id, username, email, created_at FROM users WHERE id = ?', [
            req.user.id,
        ]);
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch user profile' });
    }
});

module.exports = router;