const { TitleAccess } = require("../database");

exports.title = async (req, res) => {
  const title = await TitleAccess.getTitle(req.params.id);
  let mean = 0;
  mean = await TitleAccess.titleAvaliationMean(req.params.id);
  const aval = await TitleAccess.userAvaliationGet(title.id, req.user.id);

  const ratingValue = (1 - title.vote_average / 10) * 201.06;
  const ratingStyle = `stroke-dashoffset: ${ratingValue}`;

  const backdropStyle = `background-image: url(${title.backdrop_path})`;

  res.render("details", {
    ...title,
    user: req.user,
    backdrop_style: backdropStyle,
    rating_style: ratingStyle,
    release_year: title.release_date.split("-")[0],
    release_date: title.release_date.replace(/-/g, "/"),
    type: title.type,
    title_id: title.id,
    mean,
    aval,
  });
};

const _formatSearchParamsToView = (searchParams) => {
  const properties = Object.keys(searchParams);

  let finalString = "";
  for (let i = 0; i < properties.length; i++) {
    const property = properties[i];
    const value = searchParams[property];

    if (property !== "status") {
      // "Status" é uma propriedade de busca interna e não é bom expor
      if (!finalString) {
        finalString = finalString.concat(`?${property}=${value}`);
      } else {
        finalString = finalString.concat(`&${property}=${value}`);
      }
    }
  }

  return finalString;
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
    searchParams: _formatSearchParamsToView(searchParams),
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
      titlePending: true,
    });
  } else {
    res.render("titleRequest", {
      title: "Sugerir Título",
      user: req.user,
      titlePending: false,
    });
  }
};

// Solicitação POST para a página de solicitação.
exports.requestPost = async (req, res) => {
  // Objeto que armazena as mensagens de erro
  let erros = {};

  // Verifica se o título é válido
  if (req.body.title === undefined || req.body.title.length < 4) {
    erros.title = "O título deve conter pelo menos 4 caractéres!";
  } else if (TitleAccess.countTitle({ title: req.body.title })) {
    erros.title = "O título está já cadastrado!";
  }

  // Verifica se o genero é válido
  const genres = [
    "Ação",
    "Animação",
    "Aventura",
    "Comédia",
    "Documentário",
    "Fantasia",
    "aroeste – Western",
    "Ficção científica",
    "Guerra",
    "Romance",
    "Suspense",
    "Terror",
    "Tragédia/Drama",
  ];
  if (req.body.genre === undefined || !genres.includes(req.body.genre)) {
    erros.genre = "Gênero inválido!";
  }

  // Verifica se o tipo é válido
  const types = ["filme", "serie", "animacao"];
  if (
    req.body.content_type === undefined ||
    !types.includes(req.body.content_type)
  ) {
    erros.content_type = "Tipo inválido!";
  }

  // Verifica se a descrição é válida
  if (req.body.description === undefined || req.body.description.length < 4) {
    erros.description = "A descrição deve conter pelo menos 20 caractéres!";
  }

  // Verifica se a hora é válida
  const timeRegexp = new RegExp("^(?!00:00)[0-9]{2}:[0-5][0-9]$");
  if (
    req.body.running_time === undefined ||
    !timeRegexp.test(req.body.running_time)
  ) {
    erros.running_time = "Tempo inválido!";
  }

  // Verifica se a data é válida
  const dateRegexp = new RegExp(
    "^[1-9][0-9]{3}-0[1-9]|1[0-2]-0[1-9]|[1-2][0-9]|3[0-1]$"
  );
  if (
    req.body.release_date === undefined ||
    !dateRegexp.test(req.body.release_date)
  ) {
    erros.release_date = "Data inválida!";
  }

  const urlRegexp = new RegExp(
    "^(https?|ftp|torrent|image|irc)://(-.)?([^s/?.#-]+.?)+(/[^s]*)?$"
  );

  // Se a url do trailer não existir define como vazia
  if (
    req.body.trailer_path === undefined ||
    !urlRegexp.test(req.body.trailer_path)
  ) {
    req.body.trailer_path = "";
  }

  // Verifica se a url do poster é válida
  if (
    req.body.poster_path === undefined ||
    !urlRegexp.test(req.body.poster_path)
  ) {
    erros.poster_path = "URL inválida!";
  }

  // Se a url do fundo não existir define como vazia
  if (
    req.body.backdrop_path === undefined ||
    !urlRegexp.test(req.body.backdrop_path)
  ) {
    req.body.backdrop_path = "";
  }

  if (Object.keys(erros).length) {
    // Renderiza página se houver erros
    res.status(400).json({ erros: erros });
  } else {
    const newTitle = TitleAccess.createTitle({
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

    res.json({ title: newTitle });
  }
};

// Avaliacao do usuario

exports.avaliationPost = async (req, res) => {
  const { title_id, entry } = req.body;

  TitleAccess.addAvaliation(title_id, entry, req.user.id);
  // await TitleAccess.addAvaliation({
  //   title_id: req.body.title_id,
  //   type: req.body.type,
  //   user_id: req.user.id,
  //   entry: req.body.entry,
  // });
  res.json({ response: true });
};
