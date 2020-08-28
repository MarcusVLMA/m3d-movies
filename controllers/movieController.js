const database = require("../database");

exports.movie = async (req, res) => {
  const movieAccess = database.MovieAccess;
  const movie = await movieAccess.getMovie(Number(req.params.id));

  const ratingValue = (1 - movie.vote_average / 10) * 201.06;
  const ratingStyle = `stroke-dashoffset: ${ratingValue}`;

  const backdropStyle = `background-image: url(${movie.backdrop_path})`;

  res.render("details", {
    ...movie,
    backdrop_style: backdropStyle,
    rating_style: ratingStyle,
    release_year: movie.release_date.split("-")[0],
    release_date: movie.release_date.replace(/-/g, "/"),
  });
};
