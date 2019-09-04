const {
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
    GraphQLList
} = require("graphql");

const categoryType=require("./categoryType");
const categoryModel =require("../models/categoryModel");

const componentType = new GraphQLObjectType({   // component type
    name:"Component",
    fields:() => ({
        _id:{type: GraphQLID},
        componentName:{type: GraphQLString},
        createdBy:{type: GraphQLString},
        modifiedBy:{type: GraphQLString},
        createdDate:{type: GraphQLString},
        modifiedDate:{type: GraphQLString},
        
    })
});

module.exports= componentType;