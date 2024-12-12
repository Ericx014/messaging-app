const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  contactId: String,
  name: String,
});

module.exports = mongoose.model("Contact", contactSchema);


