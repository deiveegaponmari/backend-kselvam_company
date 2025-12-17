const HeroSliderModel = require("../models/HeroSliderModel");

//store image url
const CreateSlider = async (req, res) => {
  try {
    const { imageUrl } = req.body;

    const slide = await HeroSliderModel.create({ imageUrl });
    //await slide.save();

    res.status(201).json(slide);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const GetSlider = async (req, res) => {
  try {
    const slides = await HeroSliderModel.find();
    res.json(slides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  CreateSlider,
  GetSlider
};
