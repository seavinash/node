const express = require('express');
const bodyParser = require('body-parser');
const cron = require("node-cron");
let nodemailer = require("nodemailer");
const mysql   = require('mysql');

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;










    
    // create a mail transporter...
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
        user: "avinash@di91.com",
        pass: "d!!!mpression"
        }
    });

    //making connection to the database...
    const connection = mysql.createConnection({
        host     : 'dev.cwkgkzsh3tzj.ap-south-1.rds.amazonaws.com',
        user     : 'didev',
        password : 'dig121009_DI',
        database : 'rakyans'
    });

    connection.connect();

    let dbQuery = "SELECT p.id, p.email, s.is_survey_filled, s.is_notification_sent FROM patients p LEFT JOIN survey_details s ON p.id = s.patient_id AND s.is_survey_filled = 0 AND s.is_notification_sent = 0";

    connection.query(dbQuery, (err, rows, fields) => {
        if(err) throw err;
        const email = rows.map((row) => {
            return row.email;
        });
        console.log('Results', email);

        // sending emails at periodic intervals...
        cron.schedule("* * * * *", function(){
            console.log("---------------------");
            console.log("Running Cron Job");
            let mailOptions = {
            from: "avinash@di91.com",
            to: email,
            subject: `Survey Reminder`,
            text: `Hi there, Please fill the survey form, Ignore if already filled.`
            };
            transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                throw error;
            } else {
                console.log(info);
                console.log("Email successfully sent!");
            }
            });
        });


    });





app.get('/patients', (req, res) => {
    
    
})

 
app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});
