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
      secure: false, // true only for 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    /*  User email (confirmation) */
    await transporter.sendMail({
      from: `"K Selvam Sounds" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: "Booking Request Received",
      text: "Thanks for contacting us. We will reach you shortly.",
    });

    /*  Admin email (notification) */

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

    await transporter.verify();

    /* await transporter.sendMail({
      from: `"K Selvam Sounds" <${process.env.SMTP_EMAIL}>`,
      to: process.env.SMTP_EMAIL,
      replyTo: email,
      subject: `New Event Booking - ${eventName}`,
      text: `
Event: ${eventName}
Name: ${name}
Phone: ${phone}
Email: ${email}
Message: ${message}
      `,
    }); */

    res.status(200).json({
      data: booking,
      success: true,
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
