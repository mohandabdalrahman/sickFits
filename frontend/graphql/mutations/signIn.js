import { gql } from '@apollo/client';

export default gql`
mutation SIGNIN_MUTATION($email:String!, $password:String!){
authenticateUserWithPassword(email:$email, password:$password){
...on UserAuthenticationWithPasswordSuccess{
  item{
    id
    email
    name
  }
}
...on UserAuthenticationWithPasswordFailure{
  message
  code
}
}
}
`