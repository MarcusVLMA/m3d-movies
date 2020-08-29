const database = require("../database");

exports.title = async (req, res) => {
  const titleAccess = database.TitleAccess;
  const title = await titleAccess.getTitle(Number(req.params.id));

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
  const searchName = req.query.search;

  const titleAccess = database.TitleAccess;
  const titles = titleAccess.searchTitles(searchName);

  const pageTitle = "Galeria";

  res.render("gallery", {
    title: pageTitle,
    titles,
  });
};
