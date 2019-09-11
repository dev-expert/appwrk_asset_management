import gql from 'graphql-tag';


const GET_Categories = gql`
  query {
        categories
        {
          _id
          categoryName
          createdBy
          modifiedBy
          createdDate
          modifiedDate
        }
    
  }
`;

const GET_Components = gql`
  query {
        components
        {
            _id
            componentName
            createdBy
            modifiedBy
            createdDate
            modifiedDate
            categoryId
            category
                {
                    categoryName
                }
        }
    
  }
`;

const GET_Assets=gql`
    query{
            assets
            {
                _id
                assetName
                serialNo
                manufacturer
                description
                expiryDate
                color
                purchaseDate
                purchaseCost
                owner
                status
                createdBy
                modifiedBy
                createdDate
                modifiedDate
                componentId
                component
                {
                    _id
                    componentName
                    category
                    {
                        categoryName
                        createdBy
                    }
                }
                user
                {
                    _id
                    empId
                    fullName
                    designation
                    createdBy
                    modifiedBy
                    createdDate
                    modifiedDate
                }
            }
        }
`;

const GET_Users = gql`
        query{
            users
            {
                _id
                empId
                fullName
                designation
                createdBy
                modifiedBy
                createdDate
                modifiedDate
            }
        }
`;

const auth_Admin = gql`
        mutation($userName:String,$password:String){
            admin(userName:$userName,password:$password)
            {
                _id
                userName
                token
            }
        }
`;

const addCategoryMutation = gql`
    mutation($categoryName:String!,$createdBy:String!,$modifiedBy:String!,$createdDate:String!,$modifiedDate:String!){
        addCategory(categoryName:$categoryName,createdBy:$createdBy,modifiedBy:$modifiedBy,createdDate:$createdDate,modifiedDate:$modifiedDate)
        {
            categoryName
        }
    }
`;

const addComponentMutation = gql`
    mutation($componentName:String!,$createdBy:String!,$modifiedBy:String!,$createdDate:String!,$modifiedDate:String!,$categoryId:ID!){
        addComponent(componentName:$componentName,createdBy:$createdBy,modifiedBy:$modifiedBy,createdDate:$createdDate,modifiedDate:$modifiedDate,categoryId:$categoryId)
        {
            componentName
        }
    }
`;

const addUserMutation = gql`
    mutation($empId:String!,$fullName:String!,$designation:String!,$createdBy:String!,$modifiedBy:String!,$createdDate:String!,$modifiedDate:String!){
        addUser(empId:$empId,fullName:$fullName,designation:$designation,createdBy:$createdBy,modifiedBy:$modifiedBy,createdDate:$createdDate,modifiedDate:$modifiedDate)
        {
            empId
            fullName
        }
    }
`;

const addAssetMutation = gql`
    mutation($assetName:String!,$serialNo:String!,$manufacturer:String!, $description:String!, $expiryDate:String!, $color:String!, $purchaseDate:String!,$purchaseCost:Int!, $owner:String!, $status:String!, $createdBy:String!,$modifiedBy:String!,$createdDate:String!,$modifiedDate:String!,$componentId:ID!){
        addAsset(
            assetName:$assetName,
            serialNo:$serialNo,
            manufacturer:$manufacturer,
            description:$description,
            expiryDate:$expiryDate,
            color:$color,
            purchaseDate:$purchaseDate,
            purchaseCost:$purchaseCost,
            owner:$owner,
            status:$status,
            createdBy:$createdBy,
            modifiedBy:$modifiedBy,
            createdDate:$createdDate,
            modifiedDate:$modifiedDate,
            componentId:$componentId)
            {
                assetName
            }
    }
`;

const removeCategory = gql`
    mutation($catId:ID!)
    {
        deleteCategory(catId:$catId)
        {
            _id
        }
    }
`;

const removeComponent = gql`
    mutation($componentId:ID!)
    {
        deleteComponent(componentId:$componentId)
        {
            _id
        }
    }
`;

const removeAsset = gql`
    mutation($assetId:ID!)
    {
        deleteAsset(assetId:$assetId)
        {
            _id
        }
    }
`;

const removeUser = gql`
    mutation($userId:ID!)
    {
        deleteUser(userId:$userId)
        {
            _id
        }
    }
`;

const updateAssetStatus = gql`
    mutation($assetId:ID!,$newStatus:String!,$owner:String!)
    {
        updateAssetStatus(assetId:$assetId,newStatus:$newStatus,owner:$owner)
        {
            _id
            
        }
    }
`;

const updateCategory = gql`
    mutation($catId:ID!,$categoryName:String!)
    {
        updateCategory(catId:$catId,categoryName:$categoryName)
        {
            _id
        }
    }
`;
const updateComponent = gql`
    mutation($comId:ID!,$componentName:String!,$categoryId:ID!)
    {
        updateComponent(comId:$comId,componentName:$componentName,categoryId:$categoryId)
        {
            _id
        }
    }
`;
const updateUser = gql`
    mutation($userId:ID!,$empId:String!,$fullName:String!,$designation:String!)
    {
        updateUser(userId:$userId,empId:$empId,fullName:$fullName,designation:$designation)
        {
            _id
        }
    }
`;
const updateAsset=gql`
    mutation($assetId:ID!,$assetName:String!,$serialNo:String!,$manufacturer:String!,$description:String!,$expiryDate:String!,$color:String!,$purchaseDate:String!,$purchaseCost:String!,$owner:ID!,$status:String!,$componentId:ID!)
    {
        updateAsset(assetId:$assetId,assetName:$assetName,serialNo:$serialNo,manufacturer:$manufacturer,description:$description,expiryDate:$expiryDate,color:$color,purchaseDate:$purchaseDate,purchaseCost:$purchaseCost,owner:$owner,status:$status,componentId:$componentId)
        {
            _id
        }
    }
`;


export {GET_Categories,GET_Components,addCategoryMutation,addComponentMutation,GET_Assets,auth_Admin,addAssetMutation,GET_Users,addUserMutation,removeCategory,removeComponent,removeAsset,removeUser,updateAssetStatus,updateCategory,updateComponent,updateUser,updateAsset}