import models from '~/src/service_providers/sequelize/models'
import { Sequelize } from 'sequelize';

export default {
  Mutation: {
    createUser: async (_, args) => {
      try {

        const result = await models.sequelize.transaction(async (t) => {
      
          const userCount = (await models.user.findAll({
            attributes:[
              [Sequelize.fn('COUNT', Sequelize.col('id')), 'userCount']
            ],
            where: {email: args.email}
          }, { transaction: t }))[0].dataValues.userCount;

          if (userCount > 0) throw new Error(`User with email ${args.email} already exists. Emails must be unique`)
      
          const user = await models.user.create({
            email: args.email,
            firstName: args.firstName,
            lastName: args.lastName,
            password: args.password
          }, { transaction: t });
      
          return user;
      
        });
      
        return result
      
      } catch (error) {
        return error
      }
    }
  },
  Query: {
    users: (_, args) => {
      return models.user.findAll({})
    },
    user: (_, args) => {
      const foundUser = models.user.findOne({
        where: {id: args.id}
      })
      if (foundUser) return foundUser
      else throw new Error(`User with id ${args.id} does not exists`)
    }
  }
}
