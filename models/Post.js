// post.js
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema( {
    sensor_id: {
        type: String,
        required: true
    },
    avg_ppm: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Post", PostSchema);