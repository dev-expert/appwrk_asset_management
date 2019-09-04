const graphql=require('graphql');
const {GraphQLObjectType,GraphQLString, GraphQLSchema, GraphQLID,GraphQLList,GraphQLObjectId,GraphQLInt}=graphql;
const Category=require("../models/categoryModel");
const Component=require("../models/componentModel");
const Asset=require("../models/assetModel");

const ComponentType=new GraphQLObjectType({
    name:'Component',
    fields:()=>({
        _id:{type: GraphQLID},
        componentName:{type: GraphQLString},
        createdBy:{type: GraphQLString},
        modifiedBy:{type: GraphQLString},
        createdDate:{type: GraphQLString},
        modifiedDate:{type: GraphQLString},
        categoryId:{type:GraphQLID},
        category:{
            type:CategoryType,
            resolve(parent,args)
            {
                return Category.findById(parent.categoryId);
            }
        }
    })
})



const CategoryType=new GraphQLObjectType({
    name:'Category',
    fields:()=>({
        _id:{type:GraphQLID},
        categoryName: { type: GraphQLString },
        createdBy: { type: GraphQLString },
        modifiedBy: { type: GraphQLString },
        createdDate: { type: GraphQLString },
        modifiedDate: { type: GraphQLString },
        component:{
            type:new GraphQLList(ComponentType),
            resolve(parent,args)
            {
                return Component.find({categoryId:parent._id});
            }
        }

    })
})

const AssetType= new GraphQLObjectType({
    name:'Asset',
    fields:()=>({
        _id:{type:GraphQLID},
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
        modifiedDate:{type: GraphQLString},
        componentId:{type:GraphQLID},
        component:{
            type: ComponentType,
            resolve(parent,args)
            {
                return Component.findById(parent.componentId);
            }
        }
    })
});

const RootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    fields:()=>({
        category:{
            type:CategoryType,
            args:{_id:{type:GraphQLID}},
            resolve(parent,args)
            {
                return Category.findById(args.id);
            }
        },
        component:{
            type:ComponentType,
            args:{_id:{type:GraphQLID}},
            resolve(parent,args)
            {
                return Component.findById(args.id);
            }
        },
        categories:{
            type:GraphQLList(CategoryType),
            resolve(parent,args)
            {
                return Category.find({});
            }
        },
        components:{
            type:GraphQLList(ComponentType),
            resolve(parent,args)
            {
                return Component.find({});
            }
        },
        assets:{
            type:GraphQLList(AssetType),
            resolve()
            {
                return Asset.find({});
            }
        }

    })
})

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addCategory:{
            type:CategoryType,
            args:{
                categoryName: { type: GraphQLString },
                createdBy: { type: GraphQLString },
                modifiedBy: { type: GraphQLString },
                createdDate: { type: GraphQLString },
                modifiedDate: { type: GraphQLString }
            },
            resolve(parent,args)
            {
                let category=new Category({
                    categoryName:args.categoryName,
                    createdBy:args.createdBy,
                    modifiedBy:args.modifiedBy,
                    createdDate:args.createdDate,
                    modifiedDate:args.modifiedDate
                });
                return category.save();
            }
        },
        addComponent:{
            type:ComponentType,
            args:{
                componentName:{type: GraphQLString},
                createdBy:{type: GraphQLString},
                modifiedBy:{type: GraphQLString},
                createdDate:{type: GraphQLString},
                modifiedDate:{type: GraphQLString},
                categoryId:{type:GraphQLID}
            },
            resolve(parent,args)
            {
                let component=new Component({
                    componentName:args.componentName,
                    createdBy:args.createdBy,
                    modifiedBy:args.modifiedBy,
                    createdDate:args.createdDate,
                    modifiedDate:args.modifiedDate,
                    categoryId:args.categoryId
                });
                return component.save();
            }
        },
        addAsset:{
            type:AssetType,
            args:{
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
                modifiedDate:{type: GraphQLString},
                componentId:{type:GraphQLID}
            },
            resolve(parent,args)
            {
                const asset=new Asset(args);
                return asset.save();
            }
        }

    }
}); 

module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})