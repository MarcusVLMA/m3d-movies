//request do titulo para acesso admin
const { TitleAccess } = require("../database");

exports.requestsTitlesPending = async (req, res) => { //para todos os filmes pendentes
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
      titlePending: titlePending,
    });
  } else {
      res.redirect("/admin/search");
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
  
  res.redirect("/admin/search");
};

exports.requestPostRemove = async (req, res) => {
  const titlePending = await TitleAccess.removeTitle(req.params.id);
  res.redirect("/admin/search");

exports.requestAccept = async (req, res) => {
  // Objeto que armazena as mensagens de erro
  let erros = {};
  if (TitleAccess.countTitle({ id: req.params.id, status: "pending" })) {
    // Verifica se o título é válido
    if (req.body.title === undefined || req.body.title.length < 4){
      erros.title = "O título deve conter pelo menos 4 caractéres!";
    }
    else if(TitleAccess.countTitle({ title: req.body.title, status: "accepted" })){
      erros.title = "O título está já cadastrado!";
    }

    // Verifica se o genero é válido
    const genres = ["Ação", 
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
                    "Tragédia/Drama"];
    if (req.body.genre === undefined || !genres.includes(req.body.genre)) {
      erros.genre = "Gênero inválido!";
    }

    // Verifica se o tipo é válido
    const types = ["filme", "serie", "animacao"];
    if (req.body.content_type === undefined || !types.includes(req.body.content_type)) {
      erros.content_type = "Tipo inválido!";
    }

    // Verifica se a descrição é válida
    if (req.body.description === undefined || req.body.description.length < 4){
      erros.description = "A descrição deve conter pelo menos 20 caractéres!";
    }

    // Verifica se a hora é válida
    const timeRegexp = new RegExp('^(?!00:00)[0-9]{2}:[0-5][0-9]$');
    if (req.body.running_time === undefined || !timeRegexp.test(req.body.running_time)) {
      erros.running_time = "Tempo inválido!";
    }

    // Verifica se a data é válida
    const dateRegexp = new RegExp('^[1-9][0-9]{3}-0[1-9]|1[0-2]-0[1-9]|[1-2][0-9]|3[0-1]$');
    if (req.body.release_date === undefined || !dateRegexp.test(req.body.release_date)) {
      erros.release_date = "Data inválida!";
    }
    
    const urlRegexp = new RegExp('^(https?|ftp|torrent|image|irc):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$');
    
    // Se a url do trailer não existir define como vazia
    if (req.body.trailer_path === undefined || !urlRegexp.test(req.body.trailer_path)) {
      req.body.trailer_path = "";
    }

    // Verifica se a url do poster é válida
    if (req.body.poster_path === undefined || !urlRegexp.test(req.body.poster_path)) {
      erros.poster_path = "URL inválida!";
    }

    // Se a url do fundo não existir define como vazia
    if (req.body.backdrop_path === undefined || !urlRegexp.test(req.body.backdrop_path)) {
      req.body.backdrop_path = "";
    }
  }
  else {
    erros.id = "ID inválido!";
  }

  if(Object.keys(erros).length) {
    // Renderiza página se houver erros
    res.status(400).json({erros: erros});
  }
  else {
    const acceptedTitle = TitleAccess.updateTitle({
      id: req.params.id,
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
    res.json({title: acceptedTitle});
  }
};

exports.requestReject = async (req, res) => {
  if (TitleAccess.countTitle({ id: req.params.id, status: "pending" })){
    await TitleAccess.removeTitle(req.params.id);
    res.json({id: req.params.id});
  }
  else {
    res.status(400).json({erros: erros});
  }
};

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

  const searchParams = { status: "pending" };

  if (searchName) {
    searchParams.title = searchName;
  }

  if (searchType) {
    searchParams.type = searchType;
  }

  const titles = TitleAccess.searchTitles(searchParams, page);

  const pageTitle = "inhai bb";
  res.render("admTitleRequest", {
    title: pageTitle,
    user: req.user,
    currentPage: page,
    searchParams: formatSearchParamsToView(searchParams),
    isUserGallery: false,
    ...titles,
  });
};