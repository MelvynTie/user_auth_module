import './dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import express from 'express';
import path from 'path';

const routes = require('./controller/routes');

const baseUrl = '/api/v1';
const PORT = process.env.PORT || 4000;
const HOSTNAME = process.env.HOSTNAME || "127.0.0.1";

// Connect to Mongodb
mongoose.connect('mongodb://127.0.0.1:27017/itemDB', {
  "useNewUrlParser": true,
  "useUnifiedTopology": true
});

const app = express();
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // * allows all domains, change to specific domain if required
  res.header("Access-Control-Allow-Headers", "Content-Type, x-json-web-token");
  next();
});

// Winston Logger
const winston = require('winston');
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('dist'));

routes(app);

// Catchs all errors thrown and sends them
// as part of the response object
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  res.status(500).send({ error: error.message });
});

// Allows React routes to render is page is refreshed.
// This will only apply to the paths specified in the route regex.
app.get('/:type(dashboard|login|register)', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist/index.html'), (error) => {
    if (error) {
      res.status(500).send(error)
    }
  })
});


// Listen to host
app.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});