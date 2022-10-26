require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./router/index');

// --- Middlewares
const cors = require('cors'); // For request by browser
const cookieParser = require('cookie-parser');

// Settings
const port = process.env.PORT || 80;

// --- Middlewares including
app.use(express.json());
app.use(cookieParser()); 
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use('/api', router);

// Server starting
app.listen(port, () => { console.log(`Server has started on ${port} for ${process.env.CLIENT_URL}`); });
