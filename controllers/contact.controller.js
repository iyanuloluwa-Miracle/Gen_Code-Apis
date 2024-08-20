// controllers/contactController.js
const { createContact } = require('../services/contact.service');

const createContactController = async (req, res) => {
  const { email, message } = req.body;

  // Validate input
  if (!email || !message) {
    return res.status(400).json({ status: 'error', message: 'Email and message are required.' });
  }

  try {
    const contact = await createContact(email, message);
    res.status(201).json({ status: 'success', message: 'Contact information recorded.', data: contact });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'An error occurred while recording contact information.' });
  }
};

module.exports = {
  createContactController,
};
