import makeUserRepository from './userRepository'
import { Op } from 'sequelize'
import { User } from '../models'

const userRepository = makeUserRepository({ User, Op })
const repositories = Object.freeze({ userRepository})

export default repositories
export { userRepository }
