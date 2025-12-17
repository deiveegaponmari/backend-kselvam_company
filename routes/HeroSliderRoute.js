const express=require('express');
const { CreateSlider,
  GetSlider }=require("../controllers/HeroSliderController");

const SliderRouter=express.Router();

SliderRouter.post("/createslide",CreateSlider);
SliderRouter.get("/getslide",GetSlider)

module.exports=SliderRouter;