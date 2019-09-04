//Server
var express = require('express');
var app = express();
var socket = require('http').Server(app);
var io = require('socket.io')(socket);
//Dependencies
var fs = require('fs');
var path = require("path");
var db = require('./app/models');
//Port
var PORT = process.env.PORT || 3000;
//Serving static files
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "app/public")));
//routes
require("./app/routes/messages-api-routes.js")(app);
//sync's server and listening on port
db.sequelize.sync().then(function () {
    socket.listen(PORT, function () {
      console.log("Server listening on: http://localhost:" + PORT);
    });
  });
//Connection to socket-io and sends message
io.on("connection", function (socket) {
    socket.on("send message", function (sent_msg, userName, callback) {
        sent_msg = "[ " + getCurrentDate() + " ] " +userName+ " : " + sent_msg;
        io.sockets.emit("update messages", sent_msg);
        callback();
    });
});
//Gets current date for socket-io
function getCurrentDate() {
    var currentDate = new Date();
    var day = (currentDate.getDate() < 10 ? '0' : '') + currentDate.getDate();
    var month = ((currentDate.getMonth() + 1) < 10 ? '0' : '') + (currentDate.getMonth() + 1);
    var year = currentDate.getFullYear();
    var hour = (currentDate.getHours() < 10 ? '0' : '') + currentDate.getHours();
    var minute = (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes();
    var second = (currentDate.getSeconds() < 10 ? '0' : '') + currentDate.getSeconds();
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}
