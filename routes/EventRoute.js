const express=require('express');
const { EventBooking }=require("../controllers/EventBookingController")
const EventRouter=express.Router();
const authMiddleware=require('../middlewares/authMiddleware')

EventRouter.post("/event-book",authMiddleware,EventBooking)

module.exports=EventRouter;