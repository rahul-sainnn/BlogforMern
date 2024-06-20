const express = require('express');
const connectDatabase = require('./config/Database');
const session = require('express-session');
const errorHandler = require('./utils/errorHandler');
const router = require('./routes/userRoute');
const Blog = require('./routes/blogRoutes');
const Payment = require('./routes/paymentRoutes');

const app = express(); 

app.use(express.json());
connectDatabase();

app.use(express.json());
app.use(errorHandler);

app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Routes
app.use('/api/users', router);
app.use('/api/bloger', Blog);
app.use('/api/gatway', Payment);

module.exports = app;
