const express = require('express');
const app = express();

const PORT = 8080;

app.get('/', (req, res) => {
  res.send('Hello Coders!');
});

app.listen(PORT, () =>
  console.log(`Your sample of MERN authentication is running in port ${PORT}`)
);
