const nodemailer = require('nodemailer');

async function createLetterConfirmEmail(urlForVerifyAccount, emailCustomer){
    try{
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.NODEMAILER_EMAIL, // generated ethereal user
            pass: process.env.NODEMAILER_PASS, // generated ethereal password
          },
        });
      
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: "Pyjam'zz", // sender address
          to: emailCustomer, // list of receivers
          subject: "Pyjam'zz : Confirmez votre adresse mail", // Subject line
          text: `Merci de confirmer votre compte en cliquant sur le lien suivant : ${urlForVerifyAccount}` // plain text body
        });
      
        console.log("Message sent: %s", info.messageId)
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
       


    }catch(e){
        return e
    }
}

module.exports = createLetterConfirmEmail;