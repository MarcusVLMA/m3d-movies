const bcrypt = require("bcrypt");
const passport = require("passport");
const { UserAccess, TitleAccess } = require("../database");
const { formatSearchParamsToView } = require("./utils");

// Solicitação GET para a página de cadastro.
exports.registrationGet = async (req, res) => {
  res.render("registration", {
    title: "Cadastro",
    user: req.user,
    erros: {},
    inputs: {},
  });
};

// Verfica se o e-mail ja existe no banco de dados
exports.emailAvailable = async (req, res) => {
  if (await UserAccess.findUser({ email: req.params.userEmail })) {
    res.json({ available: "false" });
  } else {
    res.json({ available: "true" });
  }
};

// Solicitação POST para registrar usuário.
exports.registrationPost = async (req, res, next) => {
  // Objeto que armazena as mensagens de erro
  let erros = {};

  // Verifica se o nome é válido
  if (req.body.name === undefined || req.body.name.length < 4) {
    erros.name = "Nome deve conter pelo menos 4 caractéres!";
  }

  // Verifica se o password é válido
  const passwordRegexp = new RegExp("^[-!#$@%&'*+/0-9=?A-Z^_`a-z{|}~()]{8,}$");
  if (
    req.body.userPassword === undefined ||
    !passwordRegexp.test(req.body.userPassword)
  ) {
    erros.password =
      "A senha deve conter pelo menos 8 caractéres sem espaçamento!";
  }

  // Verifica se a confirmação de senha é válida
  if (
    req.body.password_confirm === undefined ||
    req.body.userPassword !== req.body.password_confirm
  ) {
    erros.password_confirm = "As senhas não são iguais!";
  }

  // Verifica se o email válido
  const emailRegexp = new RegExp(
    "^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$"
  );
  if (
    req.body.userEmail === undefined ||
    !emailRegexp.test(req.body.userEmail)
  ) {
    erros.email = "Endereço de e-mail inválido!";
  } else if (await UserAccess.findUser({ email: req.body.userEmail })) {
    erros.email = "Endereço de e-mail já cadastrado!";
  }

  if (Object.keys(erros).length) {
    // Renderiza página se houver erros
    res.status(400).json({ erros: erros });
  } else {
    const newUser = await UserAccess.createUser({
      name: req.body.name,
      role: "USER",
      email: req.body.userEmail,
      password: bcrypt.hashSync(req.body.userPassword, 10),
    });

    // Realiza login após cadastro
    req.login(newUser, function (err) {
      if (err) {
        return next(err);
      }
      return;
    });

    res.json({ user: newUser });
  }
};

// Edicao de perfil de usuario

// Solicitação GET para a página de edicao.
exports.userProfileEditGet = async (req, res) => {
  res.render("userProfileEdit", {
    title: "Edição de Cadastro",
    user: req.user,
    erros: {},
    notification: false,
  });
};

//Sobrescreve as informacoes anteriores do usuario

exports.userProfileEditPost = async (req, res) => {
  // Objeto que armazena as mensagens de erro
  let erros = {};

  // Testa se o nome é válido
  if (req.body.name.length < 4) {
    erros.name = "Nome deve conter pelo menos 4 caractéres!";
  }

  //Testa se o password antigo esta certo
  const passwordRegexp = new RegExp("^[-!#$@%&'*+/0-9=?A-Z^_`a-z{|}~()]{8,}$");
  if (!bcrypt.compareSync(req.body.password_old, req.user.password)) {
    erros.password_old = "Senha anterior não confere!";
  }
  // Testa se o password é válido
  if (!passwordRegexp.test(req.body.password)) {
    erros.password =
      "A senha deve conter pelo menos 8 caractéres sem espaçamento!";
  }

  // Testa se a confirmação de senha é válida
  if (req.body.password != req.body.password_confirm) {
    erros.password_confirm = "As senhas não são iguais!";
  }

  // Testa se o email válido
  const emailRegexp = new RegExp(
    "^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$"
  );
  if (!emailRegexp.test(req.body.email)) {
    erros.email = "Endereço de e-mail inválido!";
  }

  if (Object.keys(erros).length) {
    // Renderiza página se houver erros
    res.render("userProfileEdit", {
      title: "Edição de Cadastro",
      user: req.user,
      erros: erros,
      inputs: req.body,
      notification: false,
    });
  } else {
    UserAccess.updateUser({
      name: req.body.name,
      role: "USER",
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      id: req.user.id,
    });
    // Renderiza página
    res.render("userProfileEdit", {
      title: "Edição de Cadastro",
      user: req.user,
      erros: {},
      notification: true,
    });
  }
};

exports.siginPost = async (req, res, next) => {
  passport.authenticate("local", function (err, user) {
    if (err) {
      return next(err);
    }
    // E-mail ou senha incorretos
    if (!user) {
      return res
        .status(401)
        .json({ status: "erro", message: "E-mail ou senha incorretos" });
    }
    // Cria a sessão
    req.login(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.json({ status: "ok" });
    });
  })(req, res, next);
};

exports.sigoutGet = (req, res) => {
  req.logout();
  res.redirect("/");
};

exports.gallery = (req, res) => {
  const page = !parseInt(req.params.page) ? 1 : parseInt(req.params.page);

  const searchType = req.query.type;
  const searchName = req.query.title;
  const orderBy = req.query.orderby;

  const searchParams = { status: "accepted" };

  if (searchName) {
    searchParams.title = searchName;
  }

  if (searchType) {
    searchParams.type = searchType;
  }

  const titles = TitleAccess.galleryTitles(
    req.user.id,
    searchParams,
    page,
    orderBy
  );
  
  const userFirstName = req.user.name.substring(0,req.user.name.indexOf(" "));

  const pageTitle = `Galeria de ${userFirstName.slice(0,10)}`;
  res.render("titlesList", {
    title: pageTitle,
    user: req.user,
    currentPage: page,
    searchParams: formatSearchParamsToView(searchParams),
    movieContentPath: "/title/",
    paginationPath: "/user/gallery/",
    ...titles,
  });
};

exports.addTitleToGallery = async (req, res) => {
  const titleId = req.body.titleId;

  TitleAccess.addTitleToUserGallery(req.user.id, titleId);

  res.json({ added: true });
};

exports.removeTitleFromGallery = async (req, res) => {
  const titleId = req.body.titleId;

  TitleAccess.removeTitleFromUserGallery(req.user.id, titleId);

  res.json({ removed: true });
};
