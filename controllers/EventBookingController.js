const EventBookingModel = require("../models/EventBookingModel");
const nodemailer = require("nodemailer");
require("dotenv").config();

const EventBooking = async (req, res) => {
  try {
    const { eventName, name, email, phone, message } = req.body;

    if (!eventName || !name || !email || !phone) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const booking = await EventBookingModel.create({
      eventName,
      name,
      email,
      phone,
      message,
    });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // ✅ verify SMTP
    await transporter.verify();
    console.log("SMTP server is ready");
    // ✅ User mail
    await transporter.sendMail({
      from: `"K Selvam Sounds" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: "Booking Request Received",
      text: "Thanks for contacting us. We will reach you shortly.",
    });

    // ✅ Admin mail
    await transporter.sendMail({
      from: `"K Selvam Sounds" <${process.env.SMTP_FROM}>`,
      to: process.env.SMTP_FROM,
      subject: `New Booking - ${eventName}`,
      text: `
          Name: ${name}
          Phone: ${phone}
          Email: ${email}
          Message: ${message}
      `,
    });

    res.status(200).json({
      success: true,
      data: booking,
      msg: "Booking request sent successfully",
    });
  } catch (error) {
    console.error("Event Booking Error:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

module.exports = {
  EventBooking,
};
