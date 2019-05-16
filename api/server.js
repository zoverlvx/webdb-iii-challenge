const express = require("express");
const configureMiddleware = require("../config/middleware");

const cohortsRouter = require("../routes/cohortsRouter")

// Server Initialization
const server = express();

// Middleware
configureMiddleware(server);

// Routes
//server.use("/api/students", studentsRouter)
server.use("/api/cohorts", cohortsRouter)

module.exports = server;
