const mongoose = require("mongoose");

const EventBookingSchema = new mongoose.Schema(
  {
     eventName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email:{
      type:String,
      required:true
    },
    phone:{
      type:String,
      required:true
    },
   message: {
      type: String,
      required: true,
    },

  },
  { timestamps: true }
);

const EventBookingModel = mongoose.model("events",EventBookingSchema);
module.exports = EventBookingModel;
