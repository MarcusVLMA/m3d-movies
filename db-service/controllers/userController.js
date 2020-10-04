const { UserAccess, TitleAccess } = require("../database");
const { base64ToJson } = require("./utils");

exports.findUser = async (req, res, next) => {
  // Decodifica os parametros
  const params = base64ToJson(req.params.encodedParams);

  const user = UserAccess.findUser(params);
  if (user){
    res.json(user);
  }
  else {
    res.sendStatus(404);
  }
};

exports.getUser = async (req, res, next) => {
  const user = UserAccess.getUser(req.params.id);

  if (user){
    res.json(user);
  }
  else{
    res.sendStatus(404);
  }
};

exports.createUser = async (req, res, next) => {

  const userInfo = {
    name: req.body.name,
    role: req.body.role,
    email: req.body.email,
    password: req.body.password,
  }

  const newUser = await UserAccess.createUser(userInfo);
  
  if (newUser) {
    res.json(newUser);
  } else {
    res.sendStatus(400);
  }
};

exports.updateUser = async (req, res, next) => {

  const userInfo = {
    name: req.body.name,
    role: req.body.role,
    email: req.body.email,
    password: req.body.password,
    id: req.body.id
  }

  const updatedUser = await UserAccess.updateUser(userInfo);
  
  if (updatedUser) {
    res.json(updatedUser);
  } else {
    res.sendStatus(400);
  }
}

exports.removeUser = async (req, res, next) => {

  const removedUser = await UserAccess.removeUser(req.params.id);
  
  if (removedUser) {
    res.json(removedUser);
  } else {
    res.sendStatus(400);
  }
}