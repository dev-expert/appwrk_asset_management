// create a client to mongodb
var MongoClient = require('mongodb').MongoClient;
 
// make client connect to mongo service
var url = "mongodb://localhost:27017/"; 

MongoClient.connect(url, function(err, db) {   //here db is the client obj
    if (err) throw err;
    var dbase = db.db("assetdb"); 
    dbase.createCollection("categories", function(err, res) {
        if (err) throw err;
        console.log("Category Collection created!");
        db.close();   //close method has also been moved to client obj
    });

    dbase.createCollection("admins", function(err, res) {
        if (err) throw err;
        console.log("admin_login Collection created!");
        db.close();   //close method has also been moved to client obj
    });

    dbase.createCollection("components", function(err, res) {
        if (err) throw err;
        console.log("asset_component Collection created!");
        db.close();   //close method has also been moved to client obj
    });

    dbase.createCollection("assets", function(err, res) {
        if (err) throw err;
        console.log("asset Collection created!");
        db.close();   //close method has also been moved to client obj
    });

    dbase.createCollection("users", function(err, res) {
        if (err) throw err;
        console.log("users Collection created!");
        db.close();   //close method has also been moved to client obj
    });

});