const db = require("./database/config");

function findUser(email, callback){
  let user, err;
  try {
    user = db.get("profiles").fnd({ email }).value();
  } catch (e) {
    err ="Database erro";
  }

  callback(err, user);
};

findUser("joana@user.com",console.log)