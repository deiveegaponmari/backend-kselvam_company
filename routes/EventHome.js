const express = require("express");
const {  CreateEvent,
  GetEvent } = require("../controllers/EventHome");

const EventHomeRouter = express.Router();

EventHomeRouter.post("/createevent", CreateEvent);
EventHomeRouter.get("/getevent", GetEvent);

module.exports = EventHomeRouter;
