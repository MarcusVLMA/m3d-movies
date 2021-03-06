const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const { UserAccess } = require("./database");

module.exports = function(passport) {
  //configuraremos o passport aqui
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    let err;
    const user = await UserAccess.getUser(id);
    if (!user) err = new Error('Database connection error');
    done(err, user);
  });

  passport.use(new LocalStrategy({
      usernameField: 'userEmail',
      passwordField: 'userPassword'
    },
    async (userEmail, userPassword, done) => {
      
      console.log(userEmail, userPassword);
      const user = await UserAccess.findUser({email: userEmail});

      // usuário inexistente
      if (!user) {
        return done(null, false);
      }

      // comparando as senhas
      bcrypt.compare(userPassword, user.password, (err, isValid) => {
        if (err) {
          return done(err);
        }
        if (!isValid) {
          return done(null, false);
        }
        return done(null, user);
      })
    }
  ));
}