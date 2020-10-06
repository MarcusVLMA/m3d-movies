const { TitleAccess } = require("../database");
const { base64ToJson } = require("./utils");

exports.getTitle = async (req, res) => {
  
  const title = await TitleAccess.getTitle(req.params.id);
  if (title){
    res.json(title);
  }
  else{
    res.sendStatus(404);
  }
}

exports.getTitlesPending = async (req, res) => {
  
  const titles = await TitleAccess.getTitlesPending(req.params.page);
  if (titles){
    res.json(titles);
  }
  else{
    res.sendStatus(404);
  }
}

exports.getTitlePending = async (req, res) => {
  
  const titles = await TitleAccess.getTitlePending(req.params.id);
  if (titles){
    res.json(titles);
  }
  else{
    res.sendStatus(404);
  }
}

exports.searchTitles = async (req, res) => {
  // Decodifica os parametros
  const searchParams = base64ToJson(req.params.encodedParams);
  const page = req.params.page || 1;
  const orderBy = req.params.order;

  const titles = await TitleAccess.searchTitles(searchParams, page, orderBy);
  if (titles){
    res.json(titles);
  }
  else{
    res.sendStatus(404);
  }
}

exports.countTitle = async (req, res) => {
  const searchParams = base64ToJson(req.params.encodedParams);

  const count = await TitleAccess.countTitle(searchParams);
  if (count){
    res.json(count);
  }
  else{
    res.sendStatus(404);
  }
}

exports.createTitle = async (req, res) => {

  const newTitle = await TitleAccess.createTitle({
    title: req.body.title,
    release_date: req.body.release_date,
    genre: req.body.genre,
    type: req.body.type,
    running_time: req.body.running_time,
    trailer_path: req.body.trailer_path,
    backdrop_path: req.body.backdrop_path,
    description: req.body.description,
    poster_path: req.body.poster_path,
    status: req.body.status,
    vote_average: req.body.vote_average,
  });
  
  if (newTitle){
    res.json(newTitle);
  }
  else{
    res.sendStatus(400);
  }
}

exports.updateTitle = async (req, res) => {

  const updatedTitle = TitleAccess.updateTitle({
    id: req.body.id,
    title: req.body.title,
    release_date: req.body.release_date,
    genre: req.body.genre,
    type: req.body.type,
    running_time: req.body.running_time,
    trailer_path: req.body.trailer_path,
    backdrop_path: req.body.backdrop_path,
    description: req.body.description,
    poster_path: req.body.poster_path,
    status: req.body.status,
  });
  
  if (updatedTitle){
    res.json(updatedTitle);
  }
  else{
    res.sendStatus(400);
  }
}

exports.removeTitle = async (req, res) => {

  const removedTitle = TitleAccess.removeTitle(req.params.id);
  if (removedTitle){
    res.json(removedTitle);
  }
  else{
    res.sendStatus(400);
  }
}

exports.addCommentary = async (req, res) => {

  const newCommentary = TitleAccess.addCommentary(
    req.params.titleId,
    req.body.profileId,
    req.body.text,
  );

  console.log(newCommentary)
  if (newCommentary){
    res.json(newCommentary);
  }
  else{
    res.sendStatus(400);
  }
}

exports.removeCommentary = async (req, res) => {

  const removedCommentary= TitleAccess.removeCommentary(req.params.commentaryId);
  console.log(removedCommentary)
  if (removedCommentary){
    res.json(removedCommentary);
  }
  else{
    res.sendStatus(400);
  }
}

exports.titleAvaliationMean = async (req, res) => {
  try {
    const mean = TitleAccess.titleAvaliationMean(req.params.id)
  
    if (mean === undefined || mean === null) {
      res.sendStatus(404)
    }
  
    res.json({ mean })
  } catch (error) {
    res.sendStatus(500)
  }
}

exports.avaliationPost = async (req, res) => {
  try {
    const { title_id, entry, userId } = req.body;

    TitleAccess.addAvaliation(title_id, entry, userId);

    let mean = 0;
    mean = TitleAccess.titleAvaliationMean(title_id);

    if (mean === undefined || mean === null) {
      res.sendStatus(404)
    }
    res.json({ mean });
  } catch(error) {
    res.sendStatus(500)
  }
};

exports.userAvaliationGet = async (req, res) => {
  try {
    const { titleId, userId } = req.params;
    const aval = TitleAccess.userAvaliationGet(titleId, userId)
    
    if (aval === undefined || aval === null) {
      res.sendStatus(404)
    }

    res.json({ aval })
  } catch(error) {
    res.sendStatus(500)
  }
}