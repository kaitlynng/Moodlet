var nodemailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing

var sendFunc = function(recipient, text, file) {
  nodemailer.createTestAccount((err, account) => {
      // create reusable transporter object using the default SMTP transport
      transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
              user: account.user, // generated ethereal user
              pass: account.pass  // generated ethereal password
          }
      });

      var mailOptions = {
          from: '"me" <me@lololol.com>', // sender address
          to: recipient, // list of receivers
          subject: 'Hello ✔', // Subject line
          text: text, // html body
          attachments: [
            {
              filename: 'earth.jpg',
              path: file
            }
          ]
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      });
  });
};

module.exports = {
  sendFunc: sendFunc
};
