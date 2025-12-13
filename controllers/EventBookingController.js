const EventBookingModel = require("../models/EventBookingModel");
const nodemailer = require("nodemailer");
require("dotenv").config();

const EventBooking = async (req, res) => {
  try {
    const { eventName, name, email, phone, message } = req.body;
    if (!eventName || !name || !email || !phone) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const NewEventBooking = await EventBookingModel.create({
      eventName,
      name,
      email,
      phone,
      message,
    });
    /*  Email----sending */
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: `New Event Booking - ${eventName}`,
      text: `
        Event: ${eventName}
        Name: ${name}
        Phone: ${phone}
        Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      data: NewEventBooking,
      success: true,
      msg: "Booking email sent!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong! Please try again." });
  }
};
module.exports = {
  EventBooking,
};
