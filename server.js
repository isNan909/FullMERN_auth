const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

const auth = require('./routes/auth.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', auth);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

// App sample route

app.get('/', (req, res) => {
  res.send('Hello Coders!');
});

// Server listening

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Your sample of MERN authentication is running at ${PORT} in ${process.env.NODE_ENV} environment`
  )
);

// // Express error handling
// app.use((req, res, next) => {
//   setImmediate(() => {
//     next(new Error('Something went wrong'));
//   });
// });

// app.use(function (err, req, res, next) {
//   console.error(err.message);
//   if (!err.statusCode) err.statusCode = 500;
//   res.status(err.statusCode).send(err.message);
// });
