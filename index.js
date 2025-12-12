const express=require('express');
require("dotenv").config()
const connectDB=require('./config/dbConfig')
const bodyParser = require('body-parser');
const UserRouter=require("./routes/UserRoute");
const EventRouter=require('./routes/EventRoute')
const cors=require('cors')
const app=express();
//middleware json
app.use(bodyParser.json());
app.use(cors());
app.get("/",(req,res)=>{
    res.send("Welcome to backend!!!! selvam company project")
})
//database connection
connectDB();
//Routes
app.use("/api",UserRouter)
app.use("/api",EventRouter)
app.listen(process.env.PORT,()=>{
    console.log(`server running successfully http://localhost:${process.env.PORT}`)
})
/* anandraj30986@gmail.com */