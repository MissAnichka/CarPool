const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const Port = process.env.Port || 8080;
const app = express();
const socketio = require('socket.io');
module.exports = app;