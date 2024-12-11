const db = require("../database");

exports.getServices = (req, res) => {
    db.query("SELECT * FROM services", (err, results) => {
        if (err) return res.status(500).json({ message: "Error retrieving services" });
        res.json(results);
    });
};
