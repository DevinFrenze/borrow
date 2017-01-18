var db = require('../models');
var oauth2orize = require('oauth2orize');
var passport = require('passport');
var ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var crypto = require('crypto');
var Utils = require('../utils/utils');
var oauth2 = oauth2orize.createServer();
var security = require('./security');

module.exports = function(app) {

  function createToken() {
    return 'snowflake';
  }

  oauth2.exchange(oauth2orize.exchange.password(
        function(client, username,
          password, scope, done) {
          db.Account.Account.find({where: {username: username}
          }).success(function(account) {
            if (!account)
            return done('Account does not exist.');

          account.comparePassword(password, function(err, isMatch) {
            if (err) {
              throw err;
            }

            if (!isMatch) {
              return done(null, false, {
                message: 'Incorrect password.'});
            }

            var accessToken = createToken(),
            refreshToken = createToken(),
            expires = Math.floor(new Date() / 1000) + 86400;

          db.sequelize.transaction(function(t) {
            var at = db.Security.OauthAccessToken.build({
              token: accessToken,
                account_id: account.id,
                client_id: client.id,
                expires_at: expires,
                scope: scope
            });

            var rt = db.Security.OauthRefreshToken.build({
              token: refreshToken,
                account_id: account.id,
                client_id: client.id,
                expires_at: expires,
                scope: scope
            });

            at.save({transaction: t}).success(function() {
              rt.save({transaction: t}).success(function() {
                t.commit();
                return done(false, accessToken, refreshToken, {
                  expires_at: expires,
                       scope: scope});
              }).error(function(
                  err) {
                t.rollback();
                return done(err);
              });

            }).error(function(err) {
              t.rollback();
              return done(err);
            });
          });
          });

          }).error(function(err) {
            return done(err);
          });

        }));

  passport.use(new ClientPasswordStrategy(
        function(clientId, clientSecret, done) {
          db.Security.OauthClient.find({
            where: {
                     client_id: clientId,
            secret: clientSecret
                   }
          }).success(function(
              row) {
            if (!row)
            return done(null, false);

          return done(null, row);
          }).error(function(err) {
            if (err)
            done(err);
          });
        }
        ));

  passport.use(new BearerStrategy({passReqToCallback: true},
        function(req, accessToken, done) {
          db.Security.OauthAccessToken.find({
            where: [
            'sg_oauth_access_token.token = ? AND sg_oauth_access_token.expires_at > EXTRACT(EPOCH FROM NOW())',
          accessToken
            ],
          include: [
            db.Account.Account
            ]
          }).success(function(row) {
            if (!row)
            return done(null, false);

          if (!row.account)
            return done(null, false);

          // this is custom stuff to this app
          security.verify(req.route, row.account, done);
          }).error(function(err) {
            if (err)
            return done(err);
          });
        }
  ));

  app.post('/oauth/v2/token', passport.authenticate([
        'oauth2-client-password'
        ], {
          session: false
        }),
      oauth2.token(), oauth2.errorHandler());
}
