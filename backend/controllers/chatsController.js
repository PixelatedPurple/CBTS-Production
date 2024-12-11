const db = require("../database");

exports.getChats = (req, res) => {
    const { userId } = req.params;
    db.query("SELECT * FROM chats WHERE user_id = ? OR recipient_id = ?", [userId, userId], (err, results) => {
        if (err) return res.status(500).json({ message: "Error retrieving chats" });
        res.json(results);
    });
};

exports.sendMessage = (req, res) => {
    const { senderId, recipientId, message } = req.body;

    const sql = "INSERT INTO chats (sender_id, recipient_id, message) VALUES (?, ?, ?)";
    db.query(sql, [senderId, recipientId, message], (err, result) => {
        if (err) return res.status(500).json({ message: "Error sending message" });
        res.status(201).json({ message: "Message sent successfully", chatId: result.insertId });
    });
};
