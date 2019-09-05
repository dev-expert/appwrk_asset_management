
const Mongoose = require("mongoose");

const userModel = Mongoose.model("users",{
    empId:String,
    fullName:String,
    designation: String,
    createdBy:String,
    modifiedBy:String,
    createdDate:String,
    modifiedDate:String
});

module.exports=userModel;