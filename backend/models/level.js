const mongoose = require('mongoose');

const levelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    threshold: {
        type: Number,
        required: true,
    },
    level: {
        type: Number,
        required: true,
    },
    color_badge: {
        type: String,
        required: true,
    },
    shadow_badge: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Level', levelSchema); 