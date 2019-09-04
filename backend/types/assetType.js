const {
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
    GraphQLInt
} = require("graphql");
componentType=require("./componentType");
componentModel=require("../models/componentModel");

const assetType = new GraphQLObjectType({
    name:"Assets",
    fields:{
        _id:{type:GraphQLID},
        component:{
            args:{
                id:{type:GraphQLID},
            },
            type:componentType,
            resolve:(parent,args) => {
                //console.log(parent.componentId);
                //console.log(args.id);
             return (parent.componentId == args.id) ? parent : null;
             //console.log(parent.componentId);
            }
        },
        assetName: {type: GraphQLString} ,
        serialNo:{type: GraphQLString},
        manufacturer:{type: GraphQLString},
        description:{type: GraphQLString},
        expiryDate:{type: GraphQLString},
        color:{type: GraphQLString},
        purchaseDate:{type: GraphQLString},
        purchaseCost:{type:GraphQLInt},
        owner:{type: GraphQLString},
        status:{type: GraphQLString},
        createdBy:{type: GraphQLString},
        modifiedBy:{type: GraphQLString},
        createdDate:{type: GraphQLString},
        modifiedDate:{type: GraphQLString}
    }
});

module.exports= assetType;