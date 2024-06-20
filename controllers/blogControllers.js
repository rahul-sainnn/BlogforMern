const Blog = require('../models/blogModel');
const catchAsyncErrors = require('../utils/catchAsyncErrors');

// Create a new blog post
const createBlog = catchAsyncErrors(async (req, res, next) => {
    const { title, content, author, createdAt, image } = req.body;

    if (!title || !content || !author || !createdAt || !image) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newBlog = new Blog({
        title,
      content,
      author,
      createdAt,
      image
    });

    await newBlog.save();
    res.status(201).json(newBlog);
});

// Get all blog posts
const getBlogs = catchAsyncErrors(async (req, res, next) => {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
});

// Get a single blog post by ID
const getBlogById = catchAsyncErrors(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(blog);
});

// Update a blog post by ID
const updateBlog = catchAsyncErrors(async (req, res, next) => {
    const { title, content, author, createdAt } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        { title, content, author, createdAt },
        { new: true, runValidators: true }
    );

    if (!updatedBlog) {
        return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(updatedBlog);
});

module.exports = {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog
};
