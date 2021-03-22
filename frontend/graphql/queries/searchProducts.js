import { gql } from '@apollo/client';

export default gql`
query SEARCH_PRODUCTS($searchTerm:String!){
 searchTerms: allProducts(where:{
   OR:[
     {name_contains_i:$searchTerm},
     {description_contains_i:$searchTerm}
   ]
 }){
id
name
photo{
  image{
    publicUrlTransformed
  }
}
  }
}


`