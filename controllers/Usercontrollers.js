const User = require("../models/Usermodels");
const bcrypt = require('bcryptjs');
const sendToken = require("../utils/jwtToken");
const catchAsyncErrors = require("../utils/catchAsyncErrors");

// Create a new user
const createUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password, username } = req.body;

    if (!name || !email || !password || !username) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword, username });
    await user.save();
    sendToken(user, 201, res);
});

// Get all users
const getUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json(users);
});

// Login user
const loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    sendToken(user, 200, res);
});

// Logout user
const logoutUser = catchAsyncErrors(async (req, res, next) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ success: false, message: "Failed to log out user" });
            }

            res.status(200).json({
                success: true,
                message: "Logout successfully",
            });
        });
    } else {
        res.status(400).json({ success: false, message: "No active session" });
    }
});

module.exports = {
    getUsers,
    createUser,
    loginUser,
    logoutUser,
};
