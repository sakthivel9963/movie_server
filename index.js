const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./src/routes');

require('dotenv').config();

require('./src/db');

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
