import oauth2orize from 'oauth2orize'
import { AccessToken, User } from '../../models'
import uid from 'uid2';
import crypto from 'crypto';

const oauth2 = oauth2orize.createServer()

function tokenize (user, client, done) {
  const token = uid(256)
  const tokenHash = crypto.createHash('sha1').update(token).digest('hex')
  const now = new Date().getTime()
  const oneHour = 60 * 60 * 1000
  const expirationDate = new Date(now + oneHour)
  AccessToken.create({
    token: tokenHash,
    expirationDate: expirationDate,
    clientId: client.id,
    userId: user.id
  }).then(function () {
    return done(null, token, null, { expires_in: expirationDate })
  })
}

oauth2.exchange(
  oauth2orize.exchange.password(function (client, username, password, scope, done) {
    User.findOne({ where: { username } }).then(
      function (user) {
        // TODO add tokenizing and more official authentication
        if (!user) return done(null, false)

        if (password !== user.password) {
          return done(null, false, {
            message: 'This password is not correct.'
          });
        }

        // return done(null, 'snowflake', 'special')
        return tokenize(user, client, done)

        // compare password and supply callback
        /*
        user.authenticate(password, function(authError, authenticated) {
          if (authError) {
            return done(authError);
          }
        });
        */
      },
      function (err) {
        return done(err)
      }
    )
}))

exports.grantToken = oauth2.token()
exports.errorHandler = oauth2.errorHandler()
