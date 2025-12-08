const mongoose = require("mongoose");
const bcrypt=require('bcryptjs');
const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    role:{
      type:String,
      enum:["Admin","User"],
      default:"User"
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//hash the password before saving
UserSchema.pre("save",async function (next){
if(this.isModified("password")){
const salt=await bcrypt.genSalt(10);
this.password=await bcrypt.hash(this.password,salt);
}
})

const UserModel = mongoose.model("Users", UserSchema);
module.exports = UserModel;
