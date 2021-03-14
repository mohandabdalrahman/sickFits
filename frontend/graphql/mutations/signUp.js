import { gql } from '@apollo/client';

export default gql`
mutation  SIGNUP_MUTATION($name:String!,$email:String!,$password:String){
createUser(data:{
  name: $name,
  email: $email,
  password: $password
}){
  id
  name
  email
}
}

`