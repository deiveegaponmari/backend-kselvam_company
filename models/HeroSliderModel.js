const mongoose = require("mongoose");

const HeroSliderSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
},
  { timestamps: true }
);

const HeroSliderModel = mongoose.model("HeroSlider", HeroSliderSchema);
module.exports = HeroSliderModel;
