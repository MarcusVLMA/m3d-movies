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
  const removedUser = db.get("profiles")
  .remove({ id: userId })
  .write();
  
  return removedUser;
}

module.exports = {
  createUser,
  getUser,
  findUser,
  updateUser,
  removeUser,
};