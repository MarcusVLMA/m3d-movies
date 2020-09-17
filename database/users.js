const db = require("./config");

function createUser(userInfo) {
  const userExists = findUser({ email: userInfo.email });

  if (userExists) {
    return null;
  } else {
    const createdUser = db
      .get("profiles")
      .push(userInfo)
      .last()
      .assign({ id: Date.now().toString() })
      .write();

    return createdUser;
  }
}

function getUser(id) {
  const user = db.get("profiles").find({ id }).value();

  return user;
}

function findUser(searchParams) {
  if (searchParams) {
    const user = db.get("profiles").find(searchParams).value();

    return user;
  } else {
    const allUsers = db.get("profiles").value();

    return allUsers;
  }
}

function updateUser(userInfo) {
  const updatedUser = db
    .get("profiles")
    .find({ id: userInfo.id })
    .assign(userInfo)
    .write();

  return updatedUser;
}

function removeUser(userId) {
  db.get("profiles")
  .remove({ id: userId })
  .write();
}

function userAvaliationMean(user_id, type) {
  const aval = db.get("avaliation").filter({ user_id }).filter({ type }).value();
  let med = 0;
  aval.forEach((avaliation) => {
    med += parseFloat(avaliation.entry);
  });
  med = med/aval.length;
  return med;
}


module.exports = {
  createUser,
  getUser,
  findUser,
  updateUser,
  removeUser,
  userAvaliationMean,
};
