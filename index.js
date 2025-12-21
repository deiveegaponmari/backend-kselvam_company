const express=require('express');
require("dotenv").config()
const connectDB=require('./config/dbConfig')
const bodyParser = require('body-parser');
const UserRouter=require("./routes/UserRoute");
const EventRouter=require('./routes/EventRoute')
const SliderRouter=require('./routes/HeroSliderRoute')
const EventHomeRouter=require('./routes/EventHome')
const ServiceRouter=require('./routes/ServiceHome')
const cors=require('cors')
const app=express();


// CORS (MUST be before routes)
app.use(cors({
  origin: "https://kselvam.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// middleware
app.use(bodyParser.json());

// test route
app.get("/", (req, res) => {
  res.send("Welcome to backend!!!! selvam company project");
});

//database connection
connectDB();

//Routes
app.use("/api",UserRouter)
app.use("/api",EventRouter)
app.use("/api",SliderRouter);
app.use("/api",ServiceRouter)
app.use('/api',EventHomeRouter)

app.listen(process.env.PORT,()=>{
    console.log(`server running successfully http://localhost:${process.env.PORT}`)
})
/* anandraj30986@gmail.com */