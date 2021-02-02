import env from '../config/environment'

export default function makeJwtFactory ({ jwt }) {
  return Object.freeze({
    generateJwt
  })

  function generateJwt ({ userEmail, userId } = {}) {
    return 'JWT ' + jwt.sign({ userEmail: userEmail, userId: userId },
      env.JWT_KEY, { expiresIn: '7d' })
  }
}
