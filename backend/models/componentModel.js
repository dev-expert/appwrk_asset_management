const Mongoose = require("mongoose");
const Schema=Mongoose.Schema;

const componentSchema=new Schema({
    componentName:String,
    createdBy:String,
    modifiedBy:String,
    createdDate:String,
    modifiedDate:String,
    categoryId:Mongoose.Schema.Types.ObjectId
})


module.exports=Mongoose.model('components',componentSchema) 






// const Mongoose = require("mongoose");


// const componentModel = Mongoose.model("components",{   // model for component
//     componentName:String,
//     createdBy:String,
//     modifiedBy:String,
//     createdDate:String,
//     modifiedDate:String
// });

// module.exports=componentModel;