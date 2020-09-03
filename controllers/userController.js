const { UserAccess } = require("../database");

// Solicitação GET para a página de cadastro.
exports.registrationGet = (req, res) => {
  res.render('registration', {
    title: 'Cadastro',
    erros: {},
    inputs: {}
  });
};

// Verfica se o e-mail ja existe no banco de dados
exports.emailAvailable = async (req, res) => {
  if (await UserAccess.findUser({ email: req.params.userEmail })){
    res.json({ 'available': 'false'});
  }
  else {
    res.json({ 'available': 'true'});
  }
};

// Solicitação POST para registrar usuário.
exports.registrationPost = async (req, res) => {
  // Objeto que armazena as mensagens de erro
  let erros = {};

  // Testa se o nome é válido
  if (req.body.name.length < 4){
    erros.name = "Nome deve conter pelo menos 4 caractéres!";
  }

  // Testa se o password é válido
  const passwordRegexp = new RegExp("^[-!#$@%&'*+/0-9=?A-Z^_`a-z{|}~\(\)]{8,}$");
  if (!passwordRegexp.test(req.body.password)){
    erros.password = "A senha deve conter pelo menos 8 caractéres sem espaçamento!";
  }
  
  // Testa se a confirmação de senha é válida
  if (req.body.password != req.body.password_confirm){
    erros.password_confirm = "As senhas não são iguais!";
  }

  // Testa se o email válido
  const emailRegexp = new RegExp("^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$");
  if (!emailRegexp.test(req.body.email)) {
    erros.email = "Endereço de e-mail inválido!";
  }

  if (await UserAccess.findUser({email: req.body.email})){
    erros.email = "Endereço de e-mail já cadastrado!";
    console.log(req.body.email);
  }

  if(Object.keys(erros).length) {
    // Renderiza página se houver erros
    res.render('registration', {
      title: 'Cadastro',
      erros: erros,
      inputs: req.body
    });
  }
  else {
    UserAccess.createUser({
      "name": req.body.name,
      "role": 'USER',
      "email": req.body.email,
      "password": req.body.password,
    });
    res.redirect('/')
  }
};

// Edicao de perfil de usuario

// Solicitação GET para a página de edicao.
exports.userProfileEditGet = (req, res) => {
  const user = UserAccess.getUser("1597780559820");
  res.render('userProfileEdit', {
        title: 'Edição de Cadastro',
        erros: {},
        inputs: {},
        user
      }
  );
};

//Sobrescreve as informacoes anteriores do usuario

exports.userProfileEditPost = async (req, res) => {
  // Objeto que armazena as mensagens de erro
  let erros = {};

  // Testa se o nome é válido
  if (req.body.name.length < 4){
    erros.name = "Nome deve conter pelo menos 4 caractéres!";
  }

  //Testa se o password antigo esta certo
  const passwordRegexp = new RegExp("^[-!#$@%&'*+/0-9=?A-Z^_`a-z{|}~\(\)]{8,}$");
  if (!passwordRegexp.test(req.body.password_old)){
    erros.password_old = "A senha deve conter pelo menos 8 caractéres sem espaçamento!";
  }
  // Testa se o password é válido
  if (!passwordRegexp.test(req.body.password)){
    erros.password = "A senha deve conter pelo menos 8 caractéres sem espaçamento!";
  }

  // Testa se a confirmação de senha é válida
  if (req.body.password != req.body.password_confirm){
    erros.password_confirm = "As senhas não são iguais!";
  }

  // Testa se o email válido
  const emailRegexp = new RegExp("^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$");
  if (!emailRegexp.test(req.body.email)) {
    erros.email = "Endereço de e-mail inválido!";
  }

  if (await UserAccess.findUser({email: req.body.email})){
    erros.email = "Endereço de e-mail já cadastrado!";
    console.log(req.body.email);
  }

  if(Object.keys(erros).length) {
    // Renderiza página se houver erros
    res.render('userProfileEdit', {
      title: 'Edição de Cadastro',
      erros: erros,
      inputs: req.body
    });
  }
  else {
    UserAccess.updateUser({
      "name": req.body.name,
      "role": 'USER',
      "email": req.body.email,
      "password": req.body.password,
      "id": "1597780559820",
    });
    res.redirect('/')
  }
};