const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Register a new user
router.post(
    '/register',
    [
        body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long.'),
        body('email').isEmail().withMessage('Invalid email address.'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const connection = await req.db;
            await connection.query('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)', [
                username,
                email,
                hashedPassword,
            ]);
            res.status(201).json({ message: 'User registered successfully!' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'User registration failed' });
        }
    }
);

// Login user
router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Invalid email address.'),
        body('password').notEmpty().withMessage('Password is required.'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const connection = await req.db;
            const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
            const user = rows[0];

            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password.' });
            }

            const isValidPassword = await bcrypt.compare(password, user.password_hash);
            if (!isValidPassword) {
                return res.status(401).json({ error: 'Invalid email or password.' });
            }

            const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            res.json({ message: 'Login successful!', token });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Login failed' });
        }
    }
);

module.exports = router;