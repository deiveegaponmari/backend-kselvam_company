const EventHomeModel = require("../models/EventHome");

//store image url
const AddEvent = async (req, res) => {
  try {
    const { imageUrl } = req.body;

    const event = await EventHomeModel.create({ imageUrl });
    //await slide.save();

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const GetEvent = async (req, res) => {
  try {
    const events = await EventHomeModel.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  AddEvent,
  GetEvent,
};
