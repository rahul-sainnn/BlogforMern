const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    }
});

const createdAtSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: [contentSchema],
    author: {
        type: String,
        required: true
    },
    createdAt: [createdAtSchema],
    image: {
        type: String,
        required: true
    }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
