const express = require('express');
const cron = require("node-cron");

let nodemailer = require("nodemailer");
const app = express();

const port = process.env.PORT || 3000;

// create mail transporter
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "avinash9817@gmail.com",
      pass: "ashwin87"
    }
  });

 // sending emails at periodic intervals
 cron.schedule("* * * * Wednesday", function(){
    console.log("---------------------");
    console.log("Running Cron Job");
    let mailOptions = {
      from: "COMPANYEMAIL@gmail.com",
      to: "sampleuser@gmail.com",
      subject: `Not a GDPR update ;)`,
      text: `Hi there, this email was automatically sent by us`
    };
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        throw error;
      } else {
        console.log("Email successfully sent!");
      }
    });
  });

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});