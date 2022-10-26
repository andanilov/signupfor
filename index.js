const express = require('express');
const app = express();
const router = require('./router/index');

// Settings
const port = process.env.PORT || 80;

// Middlewares
app.use('/api', router);

// Server starting
app.listen(port, () => { console.log(`Server has started on ${port}`); });
