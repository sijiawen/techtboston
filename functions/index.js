const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
 
//Initializing Firebase Admin SDK
admin.initializeApp();
 
//Creating Nodemailer transporter using your Mailtrap SMTP details
let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
  port: 2525,  
  auth: {
    user: "336bded6d33bec",
    pass: "e833d9b254bb4a"
  }
});
 
//Creating a Firebase Cloud Function
exports.emailSender = functions.https.onRequest((req, res) => {   
      
            //Defining mailOptions
            const mailOptions = {
            from: 'alfo.opidi85@gmail.com', //Adding sender's email
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