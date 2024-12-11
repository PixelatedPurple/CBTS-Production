const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const mysql = require('mysql2/promise');

dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }));
app.use(helmet());
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: { error: 'Too many requests, please try again later.' },
});
app.use('/api', limiter);

// MySQL Connection
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

// Middleware to connect to the database
async function connectDB(req, res, next) {
    try {
        req.db = await mysql.createConnection(dbConfig);
        next();
    } catch (err) {
        console.error('Database connection error:', err.message);
        res.status(500).json({ error: 'Database connection failed' });
    }
}

// API Endpoints
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', connectDB, require('./routes/users'));
app.use('/api/posts', connectDB, require('./routes/posts'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});