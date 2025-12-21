const express=require('express');
const {authMiddleware,adminOnly}=require('../middlewares/authMiddleware')
const EventBookingRouter=express.Router();
const {EventBooking,getBooking}=require('../controllers/EventBookingController')

EventBookingRouter.post("/event-book",EventBooking);
EventBookingRouter.get("/viewEvent",authMiddleware,adminOnly,getBooking)

module.exports=EventBookingRouter;