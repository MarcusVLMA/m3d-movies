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

function getCommentaries(movie_id) {
  const commentaries = db
    .get("movie_commentaries")
    .filter({ movie_id })
    .value();

  const commentariesWithProfiles = [];

  commentaries.forEach((commentary) => {
    const profile = db
      .get("profiles")
      .find({ id: commentary.profile_id })
      .value();
    commentariesWithProfiles.push({
      ...commentary,
      profile,
    });
  });
  return commentariesWithProfiles;
}

function getMovie(id) {
  const movie = db.get("movies").find({ id }).value();
  const commentaries = getCommentaries(movie.id);

  return {
    ...movie,
    commentaries,
  };
}

function findMovie(searchParams) {
  if (searchParams) {
    const movie = db.get("movies").find(searchParams).value();
    const commentaries = getCommentaries(movie.id);

    return {
      ...movie,
      commentaries,
    };
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
