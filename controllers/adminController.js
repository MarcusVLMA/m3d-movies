//request do titulo para acesso admin
const { TitleAccess } = require("../database");

exports.requests = async (req, res) => { //para todos os filmes pendentes
    const titlePending = await TitleAccess.getTitlesPending();
    res.render("admTitleRequest", {
        title: 'Lista Filmes Sugeridos',
        user: req.user,
        titlePending: titlePending,
    });
};


exports.requestGetEdit = async (req, res) => { //vai pegar os campos do add filme

  const titlePending = await TitleAccess.getTitlePending(req.params.id);
  //passar todas as variveis que vou precisar de um unico id
  if (titlePending){
    console.log(titlePending);
    res.render("titleRequest", {
      title: "Filme" , //pegando o id do filme
      user: req.user,
      notification: false,
      titlePending: titlePending,
    });
  } else {
      res.redirect("/admin/requests");
  }
    
};

exports.requestPostEdit = async (req, res) => {
  const titlePending = await TitleAccess.getTitlePending(req.params.id);
  TitleAccess.updateTitle({
    id: titlePending.id,
    title: req.body.title,
    release_date: req.body.release_date,
    genre: req.body.genre,
    type: req.body.content_type,
    running_time: req.body.running_time,
    trailer_path: req.body.trailer_path,
    backdrop_path: req.body.backdrop_path,
    description: req.body.description,
    poster_path: req.body.poster_path,
    status: "accepted",
  });
  
  res.redirect("/admin/requests");
};

exports.requestPostRemove = async (req, res) => {
  const titlePending = await TitleAccess.removeTitle(req.params.id);
  res.redirect("/admin/requests");
};
