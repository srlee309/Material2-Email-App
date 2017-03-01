var express = require('express');
var router = express.Router();
var validate = require('express-validation')
var Mailgun = require('mailgun-js');
var helper = require('sendgrid').mail;
var argv = require('minimist')(process.argv.slice(2));
var emailRequestValidation = require('./emailRequestValidation');
var sg = require('sendgrid')(argv['send-grid-key']);
router.post('/mail-gun-send-mail/', validate(emailRequestValidation), function (req, res) {
  if (!argv['mail-gun-key']) {
    res.status(500).send('mailgun api key is required. Provide in parameter --mail-gun-key at server start');
  } else {
    var mailgun = new Mailgun({ apiKey: argv['mail-gun-key'], domain: 'sandbox93d865866f5c46c1941b80cb63d0ed4c.mailgun.org' });

    var data = {
      from: 'Mailgun Sandbox <postmaster@sandbox93d865866f5c46c1941b80cb63d0ed4c.mailgun.org>',
      subject: req.body.subject,
      text: req.body.text
    };
    if (req.body.to && req.body.to.length > 0) {
      data.to = req.body.to.join(',');
    }
    if (req.body.cc && req.body.cc.length > 0) {
      data.cc = req.body.cc.join(',');
    }
    if (req.body.bcc && req.body.bcc.length > 0) {
      data.bcc = req.body.bcc.join(',');
    }

    mailgun.messages().send(data, function (err, body) {
      if (err) {
        res.status(500).json(err);
      }  else {
        res.json(body);
      }
    });
  }
});

router.post('/send-grid-send-mail/', validate(emailRequestValidation), function (req, res) {
  if (!argv['send-grid-key']) {
    res.status(500).send('sendgrid api key is required. Provide in parameter --send-grid-key at server start');
  } else {
    var mail = new helper.Mail();
    var personalization = new helper.Personalization();
    var fromEmail = new helper.Email("postmaster@sandboxfce304638b7e40869eca2a392220bc4e.mailgun.org", "Mailgun Sandbox");
    var content = new helper.Content('text/plain', req.body.text);
    
    mail.setFrom(fromEmail);
    mail.setSubject(req.body.subject);
    mail.addContent(content);

    for (var email of req.body.to) {
      personalization.addTo(new helper.Email(email));
    }
    if (req.body.cc) {
      for (var email of req.body.cc) {
        personalization.addCc(new helper.Email(email));
      }
    }
    if (req.body.bcc) {
      for (var email of req.body.bcc) {
        personalization.addBcc(new helper.Email(email));
      }
    }

    mail.addPersonalization(personalization);

    var request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    });

    sg.API(request, function (err, body) {
      if (err) {
        res.status(500).json(err);
      }  else {
        res.json(body);
      }
    });
  }
});
module.exports = router;