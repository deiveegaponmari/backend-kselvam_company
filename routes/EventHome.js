const express = require("express");
const {AddEvent, GetEvent } = require("../controllers/EventHome");

const EventHomeRouter = express.Router();

EventHomeRouter.post("/addevent", AddEvent);
EventHomeRouter.get("/getevent", GetEvent);

module.exports = EventHomeRouter;
