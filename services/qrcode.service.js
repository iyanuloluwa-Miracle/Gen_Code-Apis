const cloudinary = require('cloudinary').v2;
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

const deleteQRCode = async (qrCodeId) => {
  // First, find the QR code in the database
  const qrCode = await QRCode.findById(qrCodeId);

  if (qrCode) {
    // Extract the public_id from the Cloudinary URL
    const publicId = qrCode.url.split('/').pop().split('.')[0];

    // Delete the QR code from Cloudinary
    await cloudinary.uploader.destroy(`qr-codes/${publicId}`);

    // Delete the QR code from the database
    await QRCode.findByIdAndDelete(qrCodeId);
  }

  return qrCode;
};

module.exports = {
  saveQRCode,
  getUserQRCodes,
  deleteQRCode,
};
