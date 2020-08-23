const db = require("./config");

function createMovie(movieInfo) {
  const movieExists = findUser({ title: movieInfo.title });

  if (movieExists) {
    return null;
  } else {
    const createdMovie = db
      .get("movies")
      .push(movieInfo)
      .last()
      .assign({ id: Date.now().toString() })
      .write();

    return createdMovie;
  }
}

function getMovie(id) {
  const movie = db.get("movies").find({ id }).value();

  return movie;
}

function findMovie(searchParams) {
  if (searchParams) {
    const movie = db.get("movies").find(searchParams).value();

    return movie;
  } else {
    const allMovies = db.get("movies").value();

    return allMovies;
  }
}

function updateMovie(movieInfo) {
  const updatedMovie = db
    .get("movies")
    .find({ id: movieInfo.id })
    .assign(movieInfo)
    .write();

  return updatedMovie;
}

module.exports = {
  createMovie,
  getMovie,
  findMovie,
  updateMovie,
};
