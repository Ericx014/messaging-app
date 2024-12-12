const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  contactId: String,
  name: String,
	addedBy: String
});

module.exports = mongoose.model("Contact", contactSchema);


