import { gql } from '@apollo/client';

export default gql`
mutation RESET_MUTATION($email:String!,$token:String!, $password:String!){
redeemUserPasswordResetToken(email:$email,token:$token,password:$password){
code
message
}
}
`