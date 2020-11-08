const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
const express = require('express');
//const cors = require('cors');
const app = express();
//app.use(cors({ origin: true }));
const port = 3000

app.use(express.static('public'))

app.use(bodyParser.urlencoded({
  extended: true
}));

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

//credentials
let transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "336bded6d33bec",
    pass: "e833d9b254bb4a"
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/post-test', (req, res) => {
  console.log('Got body:', req.body);
  sendform(req.body);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

function sendform(formdata) {
  console.log('Got body:', formdata);
  const mailOptions = {
    from: 'hello@recallapp.com', //Adding sender's email
    to: formdata.email, //Getting recipient's email by query string
    subject: 'Your ReCall', //Email subject
    html: formdata.message //Email content in HTML
  };

  //Returning result
  return transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return res.send(err.toString());
    }
    return res.send('Email sent succesfully');
  });
}

