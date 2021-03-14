import { gql } from '@apollo/client';

export default gql`
mutation RESET_PASSWORD_MUTATION($email:String!){
  sendUserPasswordResetLink(email:$email){
    message
    code
  }
}
`