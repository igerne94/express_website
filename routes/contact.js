var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET contact page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

/* POST functionality on the contact page. */
router.post('/send', function(req, res, next) {
  var transporter = nodemailer.createTransport({
    // service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'user@gmail.com',
      pass: '***'
    }
  })

  var mailOptions = {
    from: 'user@gmail.com',
    to: 'anotheruser@gmail.com',
    subject: 'Website Submission',
    text: 'You have a new submission with the following details...Name: ' + req.body.name + ' Email: ' + req.body.email + ' Message: ' + req.body.message,
    html: '<p>You have a new submission with the following details</p><ul><li>Name: ' + req.body.name + '</li><li> Email: ' + req.body.email + '</li><li> Message: ' + req.body.message + '</li></ul>'
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if(error) {
      console.log(error);
      res.redirect('/');
    } else {
      console.log('Message sent: ' + info.response);
      res.redirect('/');
    }
  });

});

module.exports = router;
