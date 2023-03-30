const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true,
    },
    timeLimit: {
        type: Number,
        required: true,
    },
    memoryLimit: {
        type: Number,
        required: true,
    },
    inputFormat: {
        type: String,
        required: true,
    },
    outputFormat: {
        type: String,
        required: true,
    },
    sampleInput: {
        type: String,
        required: true,
    },
    sampleOutput: {
        type: String,
        required: true,
    },
    testCases: [
        {
            input: {
                type: String,
                required: true,
            },
            output: {
                type: String,
                required: true,
            },
        },
    ],
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
    ],
    tags: [
        {
            type: String,
        },
    ],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    totalAttempts: {
        type: Number,
        default: 0,
    },
    totalSubmissions: {
        type: Number,
        default: 0,
    },
    successRatio: {
        type: Number,
        default: 0,
    },
    upvotes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    downvotes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    bookmarks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    playlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    solutions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Solution',
        },
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
    explanations: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Explanation',
        },
    ],
    problemImageUrl: {
        type: String,
        required: true,
    },
    views: Number,
    is_featured: Boolean,
    is_hidden: Boolean,
    is_archived: Boolean,
    discussions: [ObjectId], // References to Discussions
    total_upvotes: Number,
    total_downvotes: Number,
    time_complexity: String,
    space_complexity: String,
    similar_problems: [ObjectId], // References to similar Problems
    related_courses: [ObjectId], // References to related Courses
    related_topics: [ObjectId], // References to related Topics
    related_problems: [ObjectId], // References to related Problems 
}, {
    timestamps: true
});


module.exports = mongoose.model('Problem', ProblemSchema);