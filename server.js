const express = require("express")
const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/Database");
const path = require("path")



// Load environment variables from config.env file
dotenv.config({ path: "./config/config.env" });

// Connecting database
connectDatabase();

const PORT = process.env.PORT || 5000;

//get path funtion
  app.get("/",(req,res)=>{
  app.use(express.static(path.resolve(__dirname,"frontend","build")));
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
})


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
