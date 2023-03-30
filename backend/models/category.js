const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    subcategories: {
        type: [String],
        default: []
    },
    problems: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Problem',
        default: []
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DsaCategory',
        default: null
    },
    childCategories: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'DsaCategory',
        default: []
    },
    image: {
        type: String,
        default: null
    },
    color: {
        type: String,
        default: null
    },
    tags: {
        type: [String],
        default: []
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    updatedOn: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', CategorySchema);
