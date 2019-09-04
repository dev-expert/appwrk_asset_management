
const Mongoose = require("mongoose");
const Schema=Mongoose.Schema;

const categorySchema=new Schema({
    categoryName: String,
    createdBy: String,
    modifiedBy:String,
    createdDate:String,
    modifiedDate:String 
})


module.exports=Mongoose.model('categories',categorySchema) 


// const categoryModel = Mongoose.model("categories", {     //  model for category
//     categoryName: String,
//     createdBy: String,
//     modifiedBy:String,
//     createdDate:String,
//     modifiedDate:String    
// });

//module.exports=categoryModel;