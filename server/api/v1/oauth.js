import oauth2orize from 'oauth2orize'
import { AccessToken, User } from '../../models'
import uid from 'uid2'
import crypto from 'crypto'

const oauth2 = oauth2orize.createServer()

async function tokenize (user, client, done) {
  const token = uid(256)
  const tokenHash = crypto.createHash('sha1').update(token).digest('hex')
  const now = new Date().getTime()
  const oneHour = 60 * 60 * 1000
  const expirationDate = new Date(now + oneHour)
  try {
    const accessToken = await AccessToken.create({
      token: tokenHash,
      expirationDate: expirationDate,
      clientId: client.id,
      userId: user.id
    })
    return done(null, token, null, { expires_in: expirationDate })
  }
  catch (err) {
    return done(err)
  }
}

oauth2.exchange(
  oauth2orize.exchange.password(
    async function (client, username, password, scope, done) {
      try {
        const user = await User.scope(null).findOne({ where: { username } })
        if (!user) return done(null, false)
        if (user.authenticate(password)) return tokenize(user, client, done)
        return done(null, false, {
          message: 'This password is not correct.'
        })
      }
      catch (err) {
        return done(err)
      }
    }
  )
)

exports.grantToken = oauth2.token()
exports.errorHandler = oauth2.errorHandler()
