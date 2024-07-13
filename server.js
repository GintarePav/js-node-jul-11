const mongoose = require("mongoose");
const app = require("./index");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const port = process.env.PORT;
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then((con) => {
    console.log("Connected to DB.");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("Express started; go to http://localhost:3000/");
});
