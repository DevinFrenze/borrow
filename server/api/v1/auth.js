import passport from 'passport'
import { BasicStrategy } from 'passport-http'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { Strategy as ClientPasswordStrategy } from 'passport-oauth2-client-password'
import crypto from 'crypto'
import { AccessToken, Client, User } from '../../models'

async function clientCallback(clientId, clientSecret, done) {
  try {
    const client = await Client.findOne({ where: { clientId } })
    if (!client) return done(null, false)
    if (!client.trustedClient) return done(null, false)
    if (client.clientSecret == clientSecret) return done(null, client)
    return done(null, false)
  }
  catch (err) {
    return done(err)
  }
}

async function tokenCallback(token, done) {
  const tokenHash = crypto.createHash('sha1').update(token).digest('hex')
  try {
    const accessToken = await AccessToken.findOne({ where: { token: tokenHash } })
    if (!accessToken) return done(null, false)
    if (new Date() > accessToken.expirationDate) return done(null, false)

    const user = await User.findById(accessToken.userId)
    if (!user) return done(null, false)
    return done(null, user, { scope: '*' })
  }
  catch (err) {
    return done(err)
  }
}

passport.use(new BasicStrategy( clientCallback ))
passport.use(new ClientPasswordStrategy( clientCallback ))
passport.use(new BearerStrategy( tokenCallback ))

exports.passwordAuthenticate = passport.authenticate(['basic', 'oauth2-client-password'], { session: false })
exports.tokenAuthenticate = passport.authenticate('bearer', { session: false })
