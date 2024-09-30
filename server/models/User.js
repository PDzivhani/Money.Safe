// to interact with mongodb , mongoose model
const mongoose = require('mongoose');
const validator = require('validator');

// Create the User Schema
// The Mongoose schema defines the structure of the User collection in MongoDB, including data types and validation rules.
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: [validator.isEmail, 'Email should be valid'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
        validate: {
            validator: function (v) {
                return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(v); // Password strength regex
            },
            message: 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character',
        },
    },
    resetToken: {
        type: String,
    },
    image: {
        type: String,
    },
    GEmail: {
        type: String,
    },
}, { timestamps: true }); // This will automatically add createdAt and updatedAt fields

// Instance methods
// replicate the functionality of the UserDetails interface from Spring Security.
userSchema.methods.getAuthorities = function () {
    return [{ authority: this.email }]; // You can modify this if you have roles
};

userSchema.methods.getUsername = function () {
    return this.email;
};

userSchema.methods.isAccountNonExpired = function () {
    return true;
};

userSchema.methods.isAccountNonLocked = function () {
    return true;
};

userSchema.methods.isCredentialsNonExpired = function () {
    return true;
};

userSchema.methods.isEnabled = function () {
    return true;
};

// Create the User model
const User = mongoose.model('User', userSchema);
module.exports = { User };