const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async ({ email, html, subject }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: '"JobPortal" <no-replay@jobportal.com>',
    to: email,
    subject: subject,
    html: html,
  });
  return info;
};


module.exports = sendMail;
