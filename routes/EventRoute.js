const express=require('express');
const { EventBooking,getBooking }=require("../controllers/EventBookingController")
const EventRouter=express.Router();
const {authMiddleware,adminOnly}=require('../middlewares/authMiddleware')

EventRouter.post("/event-book",EventBooking)
EventRouter.get("/getEvent",authMiddleware,adminOnly,getBooking)

module.exports=EventRouter;