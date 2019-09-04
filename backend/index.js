const Express = require("express");
const graphqlHTTP=require('express-graphql');
const Mongoose = require("mongoose");
const schema=require("./schema/schema");
var cors = require('cors');


var app = Express();

//Mongoose.connect("mongodb://localhost:27017/manage_asset", { useNewUrlParser: true });
// connect to mongodb
Mongoose.connect("mongodb://localhost:27017/assetdb", { useNewUrlParser: true }, function (error) {
    if (error) {
     console.log('Could not connect to DB: %s', error);
    }
   });

app.use(cors());

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
  }));

app.listen(5000, () => {
    console.log("Listening at :5000...");
});