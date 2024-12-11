const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) return res.status(403).json({ message: "Token is required" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid or expired token" });
        req.user = decoded;
        next();
    });
};

module.exports = authenticate;
