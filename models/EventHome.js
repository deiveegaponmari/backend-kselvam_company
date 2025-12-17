const mongoose = require("mongoose");

const EventHomeSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
},
  { timestamps: true }
);

const EventHomeModel = mongoose.model("EventHome", EventHomeSchema);
module.exports = EventHomeModel;
