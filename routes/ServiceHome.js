const express = require("express");
const { CreateService, GetService } = require("../controllers/ServiceHome");

const ServiceRouter = express.Router();

ServiceRouter.post("/createservice", CreateService);
ServiceRouter.get("/getservice", GetService);

module.exports = ServiceRouter;
