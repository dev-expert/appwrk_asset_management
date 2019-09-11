
const Mongoose = require("mongoose");

const assetModel = Mongoose.model("assets",{
    assetName: String,
    serialNo:String,
    manufacturer:String,
    description:String,
    expiryDate:String,
    color:String,
    purchaseDate:String,
    purchaseCost:Number,
    owner:Mongoose.Schema.Types.ObjectId,
    status:String,
    image:String,
    createdBy:String,
    modifiedBy:String,
    createdDate:String,
    modifiedDate:String,
    componentId:Mongoose.Schema.Types.ObjectId
});

module.exports=assetModel;