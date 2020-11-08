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

//credentials
let transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "336bded6d33bec",
    pass: "e833d9b254bb4a"
  }
});

document.getElementById('email').send = function () {
    var datecheck =
        document.querySelector("#date [name='date']");
    var myDate = datecheck.value;
    var emailcheck =
        document.querySelector("#email [name='email']");
    var email = emailcheck.value;
    var msgcheck =
        document.querySelector("#msg [name='msg']");
    var message = msgcheck.value;
}

var mailOptions = {
  from: email,
  to: email,
  subject: 'Dear Future Me',
  text: message
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

/*
exports.sendEmail = 
    .document('mail/{mailId}')
    .onCreate((snap, context) => {

});

const mailOptions = {
    from: `softauthor1@gmail.com`,
    to: snap.data().email,
    subject: 'contact form message',
    html: `<h1>Order Confirmation</h1>
     <p> <b>Email: </b>${snap.data().email} </p>`
};

return transporter.sendMail(mailOptions, (error, data) => {
    if (error) {
        console.log(error)
        return
    }
    console.log("Sent!")
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
            if(err){
                return res.send(err.toString());
            }
            return res.send('Email sent succesfully');
        });
       
});
*/

app.get('/', (request, response) => {
  response.render('home.handlebars');
});

app.get('/newletter', (request, response) => {
  response.render('newletter.handlebars');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});

exports.app = functions.https.onRequest(app);
