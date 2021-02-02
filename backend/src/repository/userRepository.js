export default function makeUserRepository ({ User, Op }) {
  return Object.freeze({
    save,
    findAll,
    findPseudo,
    findByEmailOrUsername,
    findByEmail,
    findByUsername,
    findById,
    remove
  })

  async function save ({ ...userInfo }) {
    return User.create(userInfo)
  }

  async function searchUsername ({ username }) {
    return User.findAll(
      {
        where: {
          username: {
            [Op.startsWith]: username.toLowerCase()
          }
        },
        attributes: ['username', 'email']
      })
  }



  async function findAll () {
    return User.findAll(
      { attributes: ['userId', 'username', 'email', 'firstName', 'lastName'] })
  }

  async function findById ({ id: userId }) {
    return User.findByPk(userId)
  }

  async function findPseudo ({ pseudo }) {
    return User.findAll({
      where: {
        [Op.or]: [
          { username: pseudo }, { email: pseudo }
        ]
      }
    })
  }

  async function findByUsername ({ username }) {
    return User.findOne({ where: { username: username } })
  }

  async function findByEmailOrUsername ({ email, username }) {
    return User.findAll({
      where: {
        [Op.or]: [
          { email: email }, { username: username }
        ]
      }
    })
  }

  async function findByEmail ({ ...userInfo }) {
    return User.findAll({
      where: {
        email: userInfo.email
      }
    })
  }

  async function remove ({ userId }) {
    return User.destroy({ where: { userId: userId } })
  }
}
