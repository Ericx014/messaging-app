const mongoose = require("mongoose");

const password = "password";
const databaseName = "databaseName"
const url = `mongodb+srv://Anonimoe:${password}@fullstack-anonimo.o9noq5l.mongodb.net/${databaseName}
	?retryWrites=true&w=majority&appName=fullstack-anonimo`;

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then(() => {
    console.log("MongoDB connection successful!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });


