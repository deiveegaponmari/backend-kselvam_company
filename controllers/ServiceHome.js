const ServiceHomeModel = require("../models/ServiceHome");

//store image url
const CreateService = async (req, res) => {
  try {
    const { imageUrl } = req.body;

    const service = await ServiceHomeModel.create({ imageUrl });
    //await slide.save();

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const GetService = async (req, res) => {
  try {
    const services = await ServiceHomeModel.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  CreateService,
  GetService
};
