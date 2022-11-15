require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// --- Swagger Documentation '/api-doc'
require('./swagger/index')(app);

// --- Middlewares
const cors = require('cors'); // For request by browser
const cookieParser = require('cookie-parser');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware');
const userRouter = require('./router/user-router');
const mainRouter = require('./router/indx');

// Settings
const port = process.env.PORT || 80;

// --- Middlewares including
app.use(express.json());
app.use(cookieParser()); 
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(process.env.API_ROUTE, router);
mainRouter(app);
app.use(errorMiddleware);

// Connect to database and Server starting
const start = async () => {
  try {
    // 1. Connect to DataBase (MongoDB)
    await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    // 2. Server starting
    app.listen(port, () => { console.log(`Server has started on ${port} for ${process.env.CLIENT_URL}`); });
  } catch (e) {
      console.log(e);
  }
};

start();
