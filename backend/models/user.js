const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long']
    },
    role: {
        type: String,
        enum: ["user", "instructor", "admin"],
        default: "user",
    },
    phone: {
        type: String,
        required: true,
        match: [/^[1-9]\d{9}$/, 'Please enter a valid phone number']
    },
    avatar: {
        type: String,
        default: 'default.png'
    },
    bio: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        default: 'Other'
    },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        postalCode: { type: String }
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    education: [{
        institution: { type: String },
        degree: { type: String },
        fieldOfStudy: { type: String },
        from: { type: Date },
        to: { type: Date },
        current: { type: Boolean, default: false },
        description: { type: String }
    }],
    dob: {
        type: Date,
        default: null
    },
    workExperience: [{
        company: { type: String },
        position: { type: String },
        from: { type: Date },
        to: { type: Date },
        current: { type: Boolean, default: false },
        description: { type: String }
    }],
    skills: {
        type: [String],
        required: true
    },
    website: {
        type: String,
        default: ''
    },
    social: {
        facebook: {
            type: String,
            default: ''
        },
        twitter: {
            type: String,
            default: ''
        },
        linkedin: {
            type: String,
            default: ''
        },
        github: {
            type: String,
            default: ''
        },
        instagram: {
            type: String,
            default: ''
        },
        youtube: {
            type: String,
            default: '',
        },
    },
    courses_enrolled: [
        {
            course_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course",
            },
            date_enrolled: {
                type: Date,
                default: Date.now,
            },
            progress: {
                type: Number,
                default: 0,
            },
            completed: {
                type: Boolean,
                default: false,
            },
            certificate_url: {
                type: String,
                default: "",
            },
            review: {
                type: String,
                default: "",
            },
            rating: {
                type: Number,
                min: 1,
                max: 5,
                required: true,
            },
            bookmarks: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Content"
            }],
        },
    ],
    courses_created: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },
    ],
    memberships: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Membership'
    }],
    cashbackPoints: {
        type: Number,
        default: 0
    },
    interviewExperiences: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InterviewExperience'
    }],
    blogPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogPost'
    }],
    notifications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification'
    }],
    paymentHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment'
    }],
    wishlist: [{
        course_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },
        date_added: {
            type: Date,
            default: Date.now,
        },
    },],
    bookmarks: [
        {
            course_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course",
            },
            lesson_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Lesson",
            },
            problem_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Problem",
            },
            date_added: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    submissions: [
        {
            problem_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Problem",
            },
            solution: {
                type: String,
                default: "",
            },
            status: {
                type: String,
                enum: ["pending", "approved", "rejected"],
                default: "pending",
            },
            date_submitted: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    notifications: [{
        message: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            default: "",
        },
        date_created: {
            type: Date,
            default: Date.now,
        },
        read: {
            type: Boolean,
            default: false,
        },
    },],
    problemPlaylists: [{
        playlistName: {
            type: String,
            required: true
        },
        problems: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Problem'
        }]
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        this.password = await bcrpyt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.comparePassword = async function(password) {
    return await bcrpyt.compare(password, this.password);
}

module.exports = mongoose.model('User', userSchema);