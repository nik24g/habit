const mongoose = require("mongoose");

let url = process.env.MONGO_DB_URL;
const createDbConnection = () => {
  mongoose
    .connect(url)
    .then(() => {
      console.log("Mongo is on rock...");
    })
    .catch((error) => console.error(error));
};

module.exports = {
  createDbConnection,
};
//developed by Nitin Goswami and mongo should be on rock always :)