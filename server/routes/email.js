const router = require('express').Router();
const nodemailer = require('nodemailer');

router.post('/send', (req, res, next) => {
  const transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
      user: process.env.SENDGRID_USERNAME,
      pass: process.env.SENDGRID_PASSWORD
    }
  });
  transporter.sendMail(req.body, error => {
    if (error) {
      return console.log(error);
    }
    console.log('e-mail sent');
  });
});

module.exports = router;
