const mongoose = require("mongoose");
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("connection succesfull");
  })
  .catch((e) => {
    console.log(e);
  });
