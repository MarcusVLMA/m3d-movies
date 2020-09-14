const { TitleAccess } = require("../database");
const { formatSearchParamsToView } = require("./utils");

exports.title = async (req, res) => {
  const title = await TitleAccess.getTitle(req.params.id);

  const ratingValue = (1 - title.vote_average / 10) * 201.06;
  const ratingStyle = `stroke-dashoffset: ${ratingValue}`;

  const backdropStyle = `background-image: url(${title.backdrop_path})`;

  const userGalleryTitleIds = TitleAccess.allGalleryTitleIds(req.user.id);
  const titleIsInUserGallery = userGalleryTitleIds.includes(req.params.id);

  res.render("details", {
    ...title,
    user: req.user,
    backdrop_style: backdropStyle,
    rating_style: ratingStyle,
    release_year: title.release_date.split("-")[0],
    release_date: title.release_date.replace(/-/g, "/"),
    titleIsInUserGallery,
  });
};

exports.titles = async (req, res) => {
  const page = !parseInt(req.params.page) ? 1 : parseInt(req.params.page);

  const searchType = req.query.type;
  const searchName = req.query.title;

  const searchParams = { status: "accepted" };

  if (searchName) {
    searchParams.title = searchName;
  }

  if (searchType) {
    searchParams.type = searchType;
  }

  const titles = TitleAccess.searchTitles(searchParams, page);

  const pageTitle = "Busca";
  res.render("search", {
    title: pageTitle,
    user: req.user,
    currentPage: page,
    searchParams: formatSearchParamsToView(searchParams),
    isUserGallery: false,
    ...titles,
  });
};

// Solicitação GET para a página de solicitação.
exports.requestGet = async (req, res) => {
  const titlePending = await TitleAccess.getTitlePending(req.params.id);
  if (titlePending) {
    console.log(titlePending);
    res.render("titleRequest", {
      title: "Sugerir Título",
      user: req.user,
      notification: false,
      titlePending: true,
    });
  } else {
    res.render("titleRequest", {
      title: "Sugerir Título",
      user: req.user,
      notification: false,
      titlePending: false,
    });
  }
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
    user: req.user,
    notification: true,
    titlePending: false,
  });
};
