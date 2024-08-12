const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const qrCodeController = require('../controllers/qrcode.controller');


router.get('/', async (req, res, next) => {
  res.send({ message: 'Welcome to Gen_code api 🚀' });
});

//Authentication 
router.post('/signup', authController.signupUser);
router.post('/login', authController.signInUser);


//Qrcode Routes
// POST: Save QR Code
router.post('/save-qr-code', qrCodeController.saveQRCode);
// GET: Retrieve Single QR Codes
router.get('/qr-codes/:userId', qrCodeController.getUserQRCodes);
// DELETE: Delete a QR Code by ID
router.delete('/qrcode/:qrCodeId', qrCodeController.deleteQRCode);


module.exports = router;
