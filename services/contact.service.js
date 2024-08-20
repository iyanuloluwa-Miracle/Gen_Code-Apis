// services/contactService.js
const Contact = require('../models/contact.model');

const createContact = async (email, message) => {
  const contact = new Contact({
    email,
    message,
  });

  return await contact.save();
};

module.exports = {
  createContact,
};
