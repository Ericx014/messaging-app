const contactRouter = require("express").Router();
const Contact = require("../models/contact");

contactRouter.post("/api/contacts", async (request, response) => {
  try {
    const body = request.body;

    const newContact = new Contact({
      contactId: body.contactId,
      name: body.name || body.contactId,
    });

    const savedContact = await newContact.save();
    response.json(savedContact);
  } catch (e) {
    console.error(e);
    response
      .status(500)
      .json({ error: "An error occurred while saving the contact" });
  }
});

module.exports = contactRouter;
