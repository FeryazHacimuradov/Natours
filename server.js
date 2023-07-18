const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const app = require('./app');
const { ServerApiVersion } = require('mongodb');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log('DB connections successful!');
});

app.use((err, req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: err,
  });
  next();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  ServerApiVersion.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.log('UNHANDLED EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  ServerApiVersion.close(() => {
    process.exit(1);
  });
});
