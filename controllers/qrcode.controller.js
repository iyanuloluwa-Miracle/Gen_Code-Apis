const qrCodeService = require('../services/qrcode.service');

// POST: Save QR Code
const saveQRCode = async (req, res) => {
  const { userId, qrCodeDataUrl, qrType } = req.body;

  try {
    const qrCode = await qrCodeService.saveQRCode(userId, qrCodeDataUrl, qrType);
    res.status(201).json({
      success: true,
      data: qrCode,
      message: 'QR Code saved successfully!',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: null,
      error: err.message,
      message: 'Failed to save QR Code',
    });
  }
};

// GET: Retrieve QR Codes for a User
const getUserQRCodes = async (req, res) => {
  const { userId } = req.params;

  try {
    const qrCodes = await qrCodeService.getUserQRCodes(userId);
    res.status(200).json({
      success: true,
      data: qrCodes,
      message: 'QR Codes retrieved successfully!',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: null,
      error: err.message,
      message: 'Failed to retrieve QR Codes',
    });
  }
};

// DELETE: Delete a QR Code by ID
const deleteQRCode = async (req, res) => {
  const { qrCodeId } = req.params;

  try {
    await qrCodeService.deleteQRCode(qrCodeId);
    res.status(200).json({
      success: true,
      message: 'QR Code deleted successfully!',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
      message: 'Failed to delete QR Code',
    });
  }
};


module.exports = {
  saveQRCode,
  getUserQRCodes,
  deleteQRCode,

};
