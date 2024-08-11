const cloudinary = require('cloudinary');
const QRCode = require('../models/qrcode.model');

// Cloudinary configuration (make sure this is set up)

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})


const saveQRCode = async (userId, qrCodeDataUrl, qrType) => {
  // Upload the QR code to Cloudinary
  const uploadResponse = await cloudinary.uploader.upload(qrCodeDataUrl, {
    public_id: `${userId}_${Date.now()}`,
    folder: 'qr-codes',
  });

  // Save the QR code data in the database
  const qrCode = new QRCode({
    userId,
    url: uploadResponse.secure_url,
    type: qrType,
  });

  await qrCode.save();
  return qrCode;
};

const getUserQRCodes = async (userId) => {
  const qrCodes = await QRCode.find({ userId });
  return qrCodes;
};

module.exports = {
  saveQRCode,
  getUserQRCodes,
};
