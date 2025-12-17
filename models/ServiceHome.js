const mongoose = require("mongoose");

const ServiceHomeSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
},
  { timestamps: true }
);

const ServiceHomeModel = mongoose.model("ServiceHome", ServiceHomeSchema);
module.exports = ServiceHomeModel;
