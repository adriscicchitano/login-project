import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation signup($data: SignupInput!){
    signup(
      data: $data
    ) {
      user {
        firstName
        lastName
        email
      }
      jwt
      authError    
    }
  }
`