require("dotenv").config();
const express = require("express");
// const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const routes = require("./routes/index.js");
//const fileUpload = require('express-fileupload');
const path = require("path");
const fs = require("fs");

require("./db.js");

const server = express();

server.name = "API";

//Get requests
// server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json({ limit: "100mb" }));

//Handle requests
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Static media routes
server.use("/api/media", express.static("media"));
server.use("/api/ipfs", express.static("ipfs"));

// Streaming de video basado en carpetas
server.get("/video/*", (req, res) => {
  // const videoPath = "/" + req.params[0];
  const videoPath = path.join(__dirname, "..", req.params[0]);

  // File exists?
  if (!fs.existsSync(videoPath)) {
    console.log("🚀 ~ server.get ~ videoPath not found!!!:", videoPath);
    return res.status(404).send("Video not found!");
  }

  const stat = fs.statSync(videoPath); // Get file stats
  const fileSize = stat.size;
  const range = req.headers.range; // Check for the "Range" header

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;

    // Create a stream for the video chunk
    const file = fs.createReadStream(videoPath, { start, end });

    // Set the response headers for partial content
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    // Set the headers for the entire file
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };

    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res); // Stream the entire file
  }
});

//Final requests route
server.use("/api", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error("Error catched at endware", err);
  res.status(status).send(message);
});

module.exports = server;
