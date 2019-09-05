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

export {GET_Categories,GET_Components,addCategoryMutation,addComponentMutation,GET_Assets,auth_Admin,addAssetMutation,GET_Users,addUserMutation,removeCategory}