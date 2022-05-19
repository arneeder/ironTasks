// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const allRoutes = require("./routes/index.routes");
app.use("/api", allRoutes);

const auth = require("./routes/auth");
app.use("/api/auth", auth);

const { isAuthenticated } = require('./middleware/jwt');

const projects = require("./routes/projects");
app.use("/api/projects", isAuthenticated, projects);

const tasks = require("./routes/tasks");
app.use("/api/tasks", isAuthenticated, tasks);

const status = require("./routes/status");
app.use("/api/status", status);

const users = require("./routes/users");
app.use("/api/users", isAuthenticated, users);



const path = require('path');
app.use(express.static(path.join(__dirname, "/client/build")));

app.use((req, res) => {
    // If no routes match, send them the React HTML.
    res.sendFile(__dirname + "/client/build/index.html");
  });

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
