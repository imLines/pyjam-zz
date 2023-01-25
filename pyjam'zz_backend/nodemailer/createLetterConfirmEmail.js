const nodemailer = require('nodemailer');

async function createLetterConfirmEmail(urlForVerifyAccount, emailCustomer) {
  try {

    let transporter = nodemailer.createTransport({
      name: 'wwidev.tech',
      host: process.env.NODEMAILER_SMTP_HOSTNAME,
      port: process.env.NODEMAILER_SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    transporter.verify(function (error, success) {
      if (error) {
        return console.log("Error when verify transporter : ", error)
      }
    });

    const mailOptions = {
      from: `Pyjam'zz, ${process.env.NODEMAILER_EMAIL}`,
      to: emailCustomer,
      subject: "Pyjam'zz : Confirmez votre adresse mail",
      text: `Merci de confirmer votre compte en cliquant sur le lien suivant : ${urlForVerifyAccount}`,
      html: `Merci de confirmer votre compte en cliquant sur le lien suivant : <a href='${urlForVerifyAccount}'>Lien</a>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log("Error when send mail :", error)
      }
      console.log('Email sending : ' + info)
    })

  } catch (e) {
    return console.log(e)
  }
}

module.exports = createLetterConfirmEmail;