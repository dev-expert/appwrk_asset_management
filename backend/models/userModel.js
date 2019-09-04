
const Mongoose = require("mongoose");

const userModel = Mongoose.model("users",{
    empId:Mongoose.Schema.Types.ObjectId,
    fullName:String,
    designation: String,
    createdBy:String,
    modifiedBy:String,
    createdDate:String,
    modifiedDate:String
});

module.exports=userModel;