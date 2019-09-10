const graphql=require('graphql');
const {GraphQLObjectType,GraphQLString, GraphQLSchema, GraphQLID,GraphQLList,GraphQLObjectId,GraphQLInt}=graphql;
const Category=require("../models/categoryModel");
const Component=require("../models/componentModel");
const Asset=require("../models/assetModel");
const User = require("../models/userModel");
const Admin = require("../models/adminModel");
//const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
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
        owner:{type: GraphQLID},
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
        },
        user:{
            type: UserType,
            resolve(parent,args)
            {
                return User.findById(parent.owner);
            }
        }
    })
});

const UserType=new GraphQLObjectType({
    name:'User',
    fields:()=>({
        _id:{type:GraphQLID},
        empId:{type:GraphQLString},
        fullName:{type: GraphQLString},
        designation:{type: GraphQLString},
        createdBy:{type: GraphQLString},
        modifiedBy:{type: GraphQLString},
        createdDate:{type: GraphQLString},
        modifiedDate:{type: GraphQLString}
    })
})

const adminType=new GraphQLObjectType({
    name:'Admin',
    fields:()=>({
        _id:{type:GraphQLID},
        userName:{type:GraphQLString},
        token:{type:GraphQLString}
    })
})

const RootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    fields:()=>({
        category:{
            type:CategoryType,
            args:{_id:{type:GraphQLID}},
            resolve(parent,args,req)
            {
                if(!req.isAuth)
                {
                    throw new Error('Un-authenicated');
                }
                return Category.findById(args.id);
            }
        },
        component:{
            type:ComponentType,
            args:{_id:{type:GraphQLID}},
            resolve(parent,args,req)
            {
                if(!req.isAuth)
                {
                    throw new Error('Un-authenicated');
                }
                return Component.findById(args.id);
            }
        },
        categories:{
            type:GraphQLList(CategoryType),
            resolve(parent,args,req)
            {
                if(!req.isAuth)
                {
                    throw new Error('Un-authenicated');
                }
                return Category.find({});
            }
        },
        components:{
            type:GraphQLList(ComponentType),
            resolve(parent,args,req)
            {
                if(!req.isAuth)
                {
                    throw new Error('Un-authenicated');
                }
                return Component.find({});
            }
        },
        assets:{
            type:GraphQLList(AssetType),
            resolve(parent,args,req)
            {
                if(!req.isAuth)
                {
                    throw new Error('Un-authenicated');
                }
                return Asset.find({});
            }
        },
        users:{
            type:GraphQLList(UserType),
            resolve(args,req)
            {
                if(!req.isAuth)
                {
                    throw new Error('Un-authenicated');
                }
                return User.find({});
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
            resolve(parent,args,req)
            {
                if(!req.isAuth)
                {
                    throw new Error('Un-authenicated');
                }
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
            resolve(parent,args,req)
            {
                if(!req.isAuth)
                {
                    throw new Error('Un-authenicated');
                }
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
        admin:{
            type:adminType,
            args:{userName:{type:GraphQLString},password:{type:GraphQLString}},
            resolve(parent,args)
            {
                return Admin.findOne({userName:args.userName}).then((res)=>{
                    if(!!res && !!res._id){
                      let token=jwt.sign({adminId:res._id},'secretkey')
                     return {userName:res.userName,token:token}
                    }
                    return null;
               });
               
           
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
            resolve(parent,args,req)
            {
                if(!req.isAuth)
                {
                    throw new Error('Un-authenicated');
                }
                const asset=new Asset(args);
                return asset.save();
            }
        },
        addUser:{
            type:UserType,
            args:{
                empId:{type:GraphQLString},
                fullName:{type: GraphQLString},
                designation:{type: GraphQLString},
                createdBy:{type: GraphQLString},
                modifiedBy:{type: GraphQLString},
                createdDate:{type: GraphQLString},
                modifiedDate:{type: GraphQLString}
            },
            resolve(parent,args,req)
            {
                if(!req.isAuth)
                {
                    throw new Error('Un-authenicated');
                }
                const user=new User(args);
                return user.save();
            }
        },
        addAdmin:{
            type:adminType,
            args:{
                userName:{type:GraphQLString},
                password:{type: GraphQLString},
            },
            resolve(parent,args,req)
            {
                if(!req.isAuth)
                {
                    throw new Error('Un-authenicated');
                }
                // return bcrypt.hash(args.password,12).then(res=>{
                //     const admin=new Admin({
                //     userName:args.userName,
                //     password:res
                //   });
                //   return admin.save();
                // });
                const admin=new Admin(args);
                return admin.save();
            }
        },
        deleteCategory:{
            type:CategoryType,
            args:{
                catId:{type:GraphQLID},
            },
            resolve(parent,args,req)
            {
                if(!req.isAuth)
                {
                    throw new Error('Un-authenicated');
                }
                 return Category.remove({_id:args.catId});
            }
        },
        deleteComponent:{
            type:ComponentType,
            args:{
                componentId:{type:GraphQLID},
            },
            resolve(parent,args,req)
            {
                if(!req.isAuth)
                {
                    throw new Error('Un-authenicated');
                }
                 return Component.remove({_id:args.componentId});
            }
        },
        deleteAsset:{
            type:AssetType,
            args:{
                assetId:{type:GraphQLID},
            },
            resolve(parent,args,req)
            {
                if(!req.isAuth)
                {
                    throw new Error('Un-authenicated');
                }
                 return Asset.remove({_id:args.assetId});
            }
        },
        deleteUser:{
            type:UserType,
            args:{
                userId:{type:GraphQLID},
            },
            resolve(parent,args,req)
            {
                if(!req.isAuth)
                {
                    throw new Error('Un-authenicated');
                }
                 return User.remove({_id:args.userId});
            }
        },
        updateAssetStatus:{
            type:AssetType,
            args:{
                assetId:{type:GraphQLID},
                newStatus:{type:GraphQLString},
                owner:{type:GraphQLString}

            },
            resolve(parent,args,req)
            {
                if(!req.isAuth)
                {
                    throw new Error('Un-authenicated');
                }
                 return Asset.updateOne({_id:args.assetId},{$set:{status:args.newStatus,owner:args.owner}});
            }
        },
        updateCategory:{
            type:CategoryType,
            args:{
                catId:{type:GraphQLID},
                categoryName:{type:GraphQLString}
            },
            resolve(parent,args,req)
            {
                if(!req.isAuth)
                {
                    throw new Error('Un-authenicated');
                }
                return Category.updateOne({_id:args.catId},{$set:{categoryName:args.categoryName}});
            }
        },
        updateComponent:{
            type:ComponentType,
            args:{
                comId:{type:GraphQLID},
                componentName:{type:GraphQLString},
                categoryId:{type:GraphQLID}
            },
            resolve(parent,args,req)
            {
                if(!req.isAuth)
                {
                    throw new Error('Un-authenicated');
                }
                return Component.updateOne({_id:args.comId},{$set:{componentName:args.componentName,categoryId:args.categoryId}});
            }
        },
        updateUser:{
            type:UserType,
            args:{
                userId:{type:GraphQLID},
                empId:{type:GraphQLString},
                fullName:{type:GraphQLString},
                designation:{type:GraphQLString}
            },
            resolve(parent,args,req)
            {
                if(!req.isAuth)
                {
                    throw new Error('Un-authenicated');
                }
                return User.updateOne({_id:args.userId},{$set:{empId:args.empId,fullName:args.fullName,designation:args.designation}});
            }
        }


    }
}); 

module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})