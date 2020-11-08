const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: true }));

const handlebars = require('express-handlebars').create({ defaultLayout: 'main' });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + "/public"));

var serviceAccount = require("./permissions.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ttb2020-26890.firebaseio.com"
});
const db = admin.firestore();

// create
app.post('/api/create', (req, res) => {
  (async () => {
    try {
      await db.collection('items').doc('/' + req.body.id + '/')
        .create({ item: req.body.item });
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});


let transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "336bded6d33bec",
    pass: "e833d9b254bb4a"
  }
});

exports.emailSender = functions.https.onRequest((req, res) => {

  //Defining mailOptions
  const mailOptions = {
    from: 'test@gmail.com', //Adding sender's email
    to: req.query.dest, //Getting recipient's email by query string
    subject: 'Email Sent via Firebase', //Email subject
    html: '<b>Sending emails with Firebase is easy!</b>' //Email content in HTML
  };

  //Returning result
  return transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return res.send(err.toString());
    }
    return res.send('Email sent succesfully');
  });

});

//Defining mailOptions
const mailOptions = {
  from: 'test@gmail.com', //Adding sender's email
  to: req.query.dest, //Getting recipient's email by query string
  subject: 'Email Sent via Firebase', //Email subject
  html: '<b>Sending emails with Firebase is easy!</b>' //Email content in HTML
};

