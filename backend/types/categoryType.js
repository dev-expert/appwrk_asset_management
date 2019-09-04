const {
    GraphQLID,
    GraphQLString,
    GraphQLObjectType,
} = require("graphql");



const categoryType = new GraphQLObjectType({       // Category type
    name: "Category",
    fields: {
        _id: { type: GraphQLID },
        categoryName: { type: GraphQLString },
        createdBy: { type: GraphQLString },
        modifiedBy: { type: GraphQLString },
        createdDate: { type: GraphQLString },
        modifiedDate: { type: GraphQLString },
        
    }
});

module.exports= categoryType;