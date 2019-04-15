const express = require("express"),
    http = require("http");

var app = express(),
    server = http.createServer(app);
    
app.use(express.static("public"));

server.listen(process.env.PORT || 8000, function () {
    console.log("HTTP Server running...");
});
