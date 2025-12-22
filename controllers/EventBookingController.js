const EventBookingModel = require("../models/EventBookingModel");
require("dotenv").config();
const axios = require("axios");

const BREVO_URL = "https://api.brevo.com/v3/smtp/email";

const EventBooking = async (req, res) => {
  try {
    const { eventName, name, email, phone, message } = req.body;

    if (!eventName || !name || !email || !phone) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // ✅ Save booking to DB
    const booking = await EventBookingModel.create({
      eventName,
      name,
      email,
      phone,
      message,
    });

    const headers = {
      "api-key": process.env.BREVO_API_KEY,
      "Content-Type": "application/json",
    };

    // ================= USER EMAIL =================
    const userEmailPayload = {
      sender: {
        name: "K Selvam Sounds",
        email: process.env.BREVO_SENDER_EMAIL,
      },
      to: [{ email }],
      subject: "Booking Request Received",
      htmlContent: `
        <h3>Hello ${name},</h3>
        <p>Thank you for booking <b>${eventName}</b>.</p>
        <p>We will contact you shortly.</p>
      `,
    };

    await axios.post(BREVO_URL, userEmailPayload, { headers });

    // ================= ADMIN EMAIL =================
    const adminEmailPayload = {
      sender: {
        name: "K Selvam Sounds",
        email: process.env.BREVO_SENDER_EMAIL,
      },
      to: [{ email: process.env.BREVO_SENDER_EMAIL }],
      subject: `New Booking - ${eventName}`,
      htmlContent: `
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b> ${message || "N/A"}</p>
      `,
    };

    await axios.post(BREVO_URL, adminEmailPayload, { headers });

    res.status(200).json({
      success: true,
      data: booking,
      msg: "Booking request sent successfully",
    });

  } catch (error) {
    console.error("Event Booking Error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Server error. Please try again later.",
    });
  }
};

const getBooking=async (req,res)=>{
  try{
    const bookings=await EventBookingModel.find();
    res.status(200).json({
      success:true,
      data:bookings
    })
  }
  catch(error){
    res.status(500).json({
      success:false,
      error:"Something Went Wrong"
    })
  }
}
module.exports = { 
  EventBooking,
  getBooking
 };

