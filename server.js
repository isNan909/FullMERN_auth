const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Coders!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Your sample of MERN authentication is running at ${PORT} in ${process.env.NODE_ENV} environment`
  )
);
