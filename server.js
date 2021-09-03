const express = require('express');
const app = require('./app.js');
const http = require('http');
const path = require('path');

// Serving the front end pages
app.use(express.static(__dirname+'/login_signup_app/build/'));

// redirecting all get url to indexedDB.html
app.get('/*', (req, res)=>{
    res.sendFile(path.join(__dirname + '/login_signup_app/build/index.html'));
});


// Connection port exception handling
const onError = error => {
    if (error.syscall !== "listen") {
      throw error;
    }
    const bind = typeof port === "string" ? "pipe " + port : "port " + port;
    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  };

// Server setup
const port = process.env.PORT || 3001;
app.set("port", port);

// setting up server
const server = http.createServer(app);
server.on("error", onError);
server.listen(port, ()=>{
    console.log("Server is running at port ",port);
});