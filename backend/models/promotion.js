const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        default: 'Register Now',
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    banner: {
        type: String,
        default: null
    },
    active: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Promotion', promotionSchema); 