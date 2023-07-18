const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log('DB connections successful!');
});

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

const importData = async () => {
  let retries = 3;
  while (retries > 0) {
    try {
      await Tour.create(tours);
      console.log('Data successfully loaded!');
      process.exit();
    } catch (err) {
      console.log('Import failed. Retrying...');
      retries--;
    }
  }
  console.log('Max retries reached. Failed to import data.');
  process.exit(1);
};

const deleteData = async () => {
  let retries = 3;
  while (retries > 0) {
    try {
      await Tour.deleteMany();
      console.log('Data successfully deleted!');
      process.exit();
    } catch (err) {
      console.log('Deletion failed. Retrying...');
      retries--;
    }
  }
  console.log('Max retries reached. Failed to delete data.');
  process.exit(1);
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
