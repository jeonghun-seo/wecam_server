const express = require("express");
const router = express.Router();

app.get("/", (req, res) => {
    res.send("Hello world!");
});

module.exports = router;