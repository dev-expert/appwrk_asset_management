
const Mongoose = require("mongoose");

const adminModel = Mongoose.model("admins",{
    userName: String,
    password:String,
});

module.exports=adminModel;