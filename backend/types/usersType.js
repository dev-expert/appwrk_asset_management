const {
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
} = require("graphql");

const usersType = new GraphQLObjectType({
    name:"Users",
    fields:{
        _id:{type:GraphQLID},
        empId:{type: GraphQLString},
        fullName:{type: GraphQLString},
        designation: {type: GraphQLString},
        createdBy:{type: GraphQLString},
        modifiedBy:{type: GraphQLString},
        createdDate:{type: GraphQLString},
        modifiedDate:{type: GraphQLString}
    }
});

module.exports= usersType;