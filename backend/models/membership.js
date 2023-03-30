const mongoose = require('mongoose');

const MembershipSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    plan: {
        type: String,
        enum: ['basic', 'premium', 'pro'],
        default: 'basic',
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending',
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ['card', 'paypal', 'stripe'],
        required: true,
    },
    paymentDetails: {
        type: Object,
        required: true,
    },
    cashbackAmount: {
        type: Number,
        default: 0,
        required: true,
    },
    membershipPoints: {
        type: Number,
        default: 0,
        required: true,
    },
    membershipBenefits: {
        type: [String],
        required: true,
    },
    subscriptionId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        required: true,
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('User', MembershipSchema);