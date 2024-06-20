const express = require("express");
const app = require("./app"); // Assuming app.js exports an Express app
const dotenv = require("dotenv");
const connectDatabase = require("./config/Database");
const path = require("path");

// Load environment variables from config.env file
dotenv.config({ path: "./config/config.env" });

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// Example API route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

// Connecting database
connectDatabase();

const PORT = process.env.PORT || 5000;

// The "catchall" handler: for any request that doesn't match the above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server is working on http://localhost:${PORT}`);
});
