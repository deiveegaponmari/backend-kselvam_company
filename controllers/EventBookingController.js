const EventBookingModel = require("../models/EventBookingModel");
const nodemailer = require("nodemailer");
require("dotenv").config();

const EventBooking = async (req, res) => {
  try {
    const {  eventName,name, email, phone, message, event } = req.body;
    const NewEventBooking = await EventBookingModel.create({
         eventName,
      name,
      email,
      phone,
      message,
      event,
    });
    /*  Email----sending */
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "process.env.SMTP_EMAIL",
        pass: "process.env.SMTP_PASSWORD",
      },
    });

    const mailOptions = {
      from: "process.env.SMTP_EMAIL",
      to: email,
      subject: `New Event Booking - ${event}`,
      text: `
        Event: ${event}
        Name: ${name}
        Phone: ${phone}
        Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      data: NewEventBooking,
      success: true,
      msg: "Booking email sent!",
    });
  } catch {}
};
module.exports = {
  EventBooking,
};
