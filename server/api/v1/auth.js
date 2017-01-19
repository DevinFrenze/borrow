import passport from 'passport'
import { BasicStrategy } from 'passport-http'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import crypto from 'crypto'
import { AccessToken, Client, User } from '../../models'

async function basicCallback(clientId, clientSecret, done) {
  return done(null, true)
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

passport.use(new BasicStrategy( basicCallback ))
passport.use(new BearerStrategy( tokenCallback ))

// note: apparently works even without the 'oauth2-client-password' on the line below
exports.passwordAuthenticate = passport.authenticate('basic', { session: false })
exports.tokenAuthenticate = passport.authenticate('bearer', { session: false })
