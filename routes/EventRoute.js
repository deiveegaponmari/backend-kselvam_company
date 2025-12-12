const express=require('express');
const { EventBooking }=require("../controllers/EventBookingController")
const EventRouter=express.Router();

EventRouter.post("/event-book",EventBooking)

module.exports=EventRouter;