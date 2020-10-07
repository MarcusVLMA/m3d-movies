const { UserAccess, TitleAccess } = require("../database");
const { base64ToJson } = require("./utils");

exports.findUser = async (req, res) => {
  // Decodifica os parametros
  const searchParams = base64ToJson(req.params.encodedParams);

  const user = UserAccess.findUser(searchParams);
  if (user) {
    res.json(user);
  }
  else {
    res.sendStatus(404);
  }
};

exports.getUser = async (req, res) => {
  const user = UserAccess.getUser(req.params.id);

  if (user) {
    res.json(user);
  }
  else {
    res.sendStatus(404);
  }
};

exports.createUser = async (req, res) => {

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

exports.updateUser = async (req, res) => {

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

exports.removeUser = async (req, res) => {

  const removedUser = await UserAccess.removeUser(req.params.id);

  if (removedUser) {
    res.json(removedUser);
  } else {
    res.sendStatus(400);
  }
}

exports.galleryTitles = async (req, res) => {
  // Decodifica os parametros
  const searchParams = base64ToJson(req.params.encodedParams);
  const page = req.params.page || 1;
  const orderBy = req.params.order || "";
  const profileId = req.params.profileId;

  const titles = await TitleAccess.galleryTitles(profileId, searchParams, page, orderBy);

  if (titles) {
    res.json(titles);
  }
  else {
    res.sendStatus(404);
  }
}

exports.allGalleryTitleIds = async (req, res) => {

  const titles = await TitleAccess.allGalleryTitleIds(req.params.profileId);

  if (titles) {
    res.json(titles);
  }
  else {
    res.sendStatus(404);
  }
}

exports.addTitleToUserGallery = async (req, res) => {
  const updatedGallery = await TitleAccess.addTitleToUserGallery(
    req.params.profileId,
    req.body.titleId,
  );

  if (updatedGallery) {
    res.json(updatedGallery);
  }
  else {
    res.sendStatus(400);
  }
}

exports.removeTitleFromUserGallery = async (req, res) => {
  const removedGallery = await TitleAccess.removeTitleFromUserGallery(
    req.params.profileId,
    req.params.titleId,
  );

  if (removedGallery) {
    res.json(removedGallery);
  }
  else {
    res.sendStatus(400);
  }
}

exports.userAvaliationMean = async (req, res) => {
  try {
    const { userId, type } = req.params
    const mean = UserAccess.userAvaliationMean(userId, type)

    res.json({ mean })
  } catch (error) {
    res.sendStatus(500)
  }
}