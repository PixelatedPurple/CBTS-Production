const db = require("../database");

exports.getPosts = (req, res) => {
    db.query("SELECT * FROM posts", (err, results) => {
        if (err) return res.status(500).json({ message: "Error retrieving posts" });
        res.json(results);
    });
};

exports.createPost = (req, res) => {
    const { title, content, userId } = req.body;
    const sql = "INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)";
    
    db.query(sql, [title, content, userId], (err, result) => {
        if (err) return res.status(500).json({ message: "Error creating post" });
        res.status(201).json({ message: "Post created successfully", postId: result.insertId });
    });
};

exports.getPostById = (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM posts WHERE id = ?", [id], (err, results) => {
        if (err) return res.status(500).json({ message: "Error retrieving post" });
        if (results.length === 0) return res.status(404).json({ message: "Post not found" });
        res.json(results[0]);
    });
};

exports.updatePost = (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    db.query("UPDATE posts SET title = ?, content = ? WHERE id = ?", [title, content, id], (err) => {
        if (err) return res.status(500).json({ message: "Error updating post" });
        res.json({ message: "Post updated successfully" });
    });
};

exports.deletePost = (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM posts WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).json({ message: "Error deleting post" });
        res.json({ message: "Post deleted successfully" });
    });
};
