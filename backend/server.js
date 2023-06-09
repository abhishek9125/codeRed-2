const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { readdirSync } = require('fs');
const { errorHandler } = require('./middlewares/error');
const { handleNotFound } = require('./utils/helper');

require('dotenv').config();

// App Initialisation
const app = express();

// Database Setup
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("Database Connected"))
  .catch((error) => console.log("Database Error : ", error));

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '4mb' }));
app.use(cors());

// Routes
readdirSync('./routes').map((route) => app.use('/api', require(`./routes/${route}`)));
app.use("/*", handleNotFound);
app.use(errorHandler);

// Port
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is Running on Port ${port}`);
})