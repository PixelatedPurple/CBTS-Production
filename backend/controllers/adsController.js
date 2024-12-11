const db = require("../database");

exports.getAds = (req, res) => {
    db.query("SELECT * FROM ads", (err, results) => {
        if (err) return res.status(500).json({ message: "Error retrieving ads" });
        res.json(results);
    });
};
