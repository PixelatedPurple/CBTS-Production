const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../database");

exports.register = (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    db.query("INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)", [username, email, hashedPassword], (err) => {
        if (err) return res.status(500).json({ message: "Error registering user" });
        res.status(201).json({ message: "User registered successfully" });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
        if (err || !results.length) return res.status(400).json({ message: "Invalid credentials" });
        
        const user = results[0];
        const passwordMatch = bcrypt.compareSync(password, user.password_hash);
        if (!passwordMatch) return res.status(400).json({ message: "Invalid credentials" });
        
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    });
};
