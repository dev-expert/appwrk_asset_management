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

export {GET_Categories,GET_Components,addCategoryMutation,addComponentMutation}