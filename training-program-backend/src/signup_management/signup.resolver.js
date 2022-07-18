import { createUser } from "../user_management/user.resolver"
import jwt from 'jsonwebtoken'

export default {
  Mutation: {
    signup: async (_, args) => {
      try {
        const user = await createUser(_, args.data)
        return {
          user: user,
          jwt: jwt.sign(
            {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email
            },
            `${process.env.REACT_APP_JWT_SECRET}`,
            {
              expiresIn: '10 days',
              subject: `${user.id}`
            }
          ),
          authError: ""
        }
      }catch(error){
        return {
          user: {},
          jwt: "",
          authError: error
        }
      }
    }
  }
}