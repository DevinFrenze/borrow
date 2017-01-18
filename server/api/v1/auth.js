import passport from 'passport'
import { BasicStrategy } from 'passport-http'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { Strategy as ClientPasswordStrategy } from 'passport-oauth2-client-password'
import crypto from 'crypto';
import { AccessToken, Client, User } from '../../models'

function clientCallback(clientId, clientSecret, done) {
  Client.findOne({ where: { clientId } }).then(function (client) {
    if (!client) return done(null, false)
    if (!client.trustedClient) return done(null, false)
    if (client.clientSecret == clientSecret) return done(null, client)
    return done(null, false)
  }).catch(function(err) {
    return done(err);
  })
}

function accessTokenCallback(accessToken, done) {
  const accessTokenHash = crypto.createHash('sha1').update(accessToken).digest('hex')
  console.log('find an access token where ' + accessTokenHash)
  AccessToken.findOne({ where: { token: accessTokenHash } }).then(
    function (token) {
      console.log('TOKEN ' + token)
      if (!token) return done(null, false)
      if (new Date() > token.expirationDate) return done(null, false)
      User.findById(token.userId).then(
        function (user) {
          if (!user) return done(null, false)
          done(null, user, { scope: '*' })
        },
        function (err) {
          done(err)
        }
      )
    },
    function (err) {
      done(err)
    }
  )
}

passport.use(new BasicStrategy( clientCallback ))
passport.use(new ClientPasswordStrategy( clientCallback ))
passport.use(new BearerStrategy( accessTokenCallback ))

exports.authenticate = passport.authenticate(['basic', 'oauth2-client-password'], { session: false })
exports.bearerAuthenticate = passport.authenticate('bearer', { session: false })
