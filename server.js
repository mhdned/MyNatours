const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const DB = process.env.DATABASE_LOCAL;
mongoose
  .connect(DB)
  .then(() => console.log(`Database Successfully Connected ✅`))
  .catch((err) => {
    console.log(`Some Probllem :: ${err}`);
  });

const port = process.env.PORT || 3500;
app.listen(port, '127.0.0.1', () => {
  console.log(`app run on :: http://localhost:${port}`);
});
