const { TitleAccess } = require("../database");

exports.title = async (req, res) => {
  const title = await TitleAccess.getTitle(req.params.id);

  const ratingValue = (1 - title.vote_average / 10) * 201.06;
  const ratingStyle = `stroke-dashoffset: ${ratingValue}`;

  const backdropStyle = `background-image: url(${title.backdrop_path})`;

  res.render("details", {
    ...title,
    backdrop_style: backdropStyle,
    rating_style: ratingStyle,
    release_year: title.release_date.split("-")[0],
    release_date: title.release_date.replace(/-/g, "/"),
  });
};

exports.titles = async (req, res) => {
  const page = req.params.page;
  const searchName = req.query.search;

  const titles = TitleAccess.searchTitles(searchName, page);

  const pageTitle = "Galeria";

  res.render("gallery", {
    title: pageTitle,
    currentPage: page,
    searchParams: searchName ? `?search=${searchName}` : "",
    ...titles,
  });
};

// Solicitação GET para a página de solicitação.
exports.requestGet = (req, res) => {
  res.render("titleRequest", {
    title: "Sugerir Título",
    notification: false,
  });
};

// Solicitação POST para a página de solicitação.
exports.requestPost = async (req, res) => {
  TitleAccess.createTitle({
    title: req.body.title,
    release_date: req.body.release_date,
    genre: req.body.genre,
    type: req.body.content_type,
    running_time: req.body.running_time,
    trailer_path: req.body.trailer_path,
    backdrop_path: req.body.backdrop_path,
    description: req.body.description,
    poster_path: req.body.poster_path,
    status: "pending",
    vote_average: 0,
  });

  res.render("titleRequest", {
    title: "Sugerir Título",
    notification: true,
  });
};
