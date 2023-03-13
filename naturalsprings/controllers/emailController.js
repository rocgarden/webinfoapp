const sendgrid = require("@sendgrid/mail")
const HttpError = require('../models/errorModel');
const { validationResult } = require('express-validator'); 

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

sendEmail = async(req,res,next)=>{
  const errors= validationResult(req);
  if(!errors.isEmpty()){
    return  next(new HttpError('Invalid data', 422));
  }

    try{
        console.log("req.body::", req.body)
        await sendgrid.send({
        to: 'rgarcia646@gmail.com', // Your email where you'll receive emails
        from:'rgarcia646@gmail.com', // your website email address here
        subject: `[Customer Lead from website: Web Info App] : ${req.body.subject}`,
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html lang="en">
        <head>
          <meta charset="utf-8">
        
          <title>The HTML5 Herald</title>
          <meta name="description" content="The HTML5 Herald">
          <meta name="author" content="SitePoint">
        <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
        
        <link rel="stylesheet" href="css/styles.css?v=1.0">
        
        </head>
        
        <body>
          <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">              
                </div>
                <div class="container" style="margin-left: 20px;margin-right: 20px;">
                <h2>You've got a new mail from: <h4> ${req.body.fullName}</h4>Their email is:<br> ✉️${req.body.email} </h2>
                <div style="font-size: 16px;">
                <p><h4>Phone Number:</h4>${req.body.phoneNumber}</p>
                <p><h4>Message:</h4></p>
                <p>${req.body.message}</p>
                <br>
                </div>
                <p class="footer" style="font-size: 16px;padding-bottom: 20px;border-bottom: 1px solid #D1D5DB;">Regards,<br>Web Master </p>
              
                </div>
        </body>
        </html>`,
      });
    } catch (err) {
      const error = new HttpError(
          'Sending message failed, please try again',
          500
      );
      return next(error);    }
    return res.status(200).json({ message: "email sent" });
  }
  module.exports={
      sendEmail
  }
  