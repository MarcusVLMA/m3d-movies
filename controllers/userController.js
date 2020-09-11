const bcrypt = require('bcrypt');
const passport = require('passport');
const { UserAccess } = require("../database");


// Solicitação GET para a página de cadastro.
exports.registrationGet = async (req, res) => {
  res.render('registration', {
    title: 'Cadastro',
    user: req.user,
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
exports.registrationPost = async (req, res, next) => {
  // Objeto que armazena as mensagens de erro
  let erros = {};

  // Testa se o nome é válido
  if (req.body.name.length < 4){
    erros.name = "Nome deve conter pelo menos 4 caractéres!";
  }

  // Testa se o password é válido
  const passwordRegexp = new RegExp("^[-!#$@%&'*+/0-9=?A-Z^_`a-z{|}~\(\)]{8,}$");
  if (!passwordRegexp.test(req.body.userPassword)){
    erros.password = "A senha deve conter pelo menos 8 caractéres sem espaçamento!";
  }
  
  // Testa se a confirmação de senha é válida
  if (req.body.userPassword != req.body.password_confirm){
    erros.password_confirm = "As senhas não são iguais!";
  }

  // Testa se o email válido
  const emailRegexp = new RegExp("^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$");
  if (!emailRegexp.test(req.body.userEmail)) {
    erros.email = "Endereço de e-mail inválido!";
  }

  if (await UserAccess.findUser({email: req.body.userEmail})){
    erros.email = "Endereço de e-mail já cadastrado!";
  }

  if(Object.keys(erros).length) {
    // Renderiza página se houver erros
    res.status(400).json({erros: erros});

  }
  else {
    const newUser = await UserAccess.createUser({
      "name": req.body.name,
      "role": 'USER',
      "email": req.body.userEmail,
      "password": bcrypt.hashSync(req.body.userPassword, 10),
    });
    
    // Realiza login após cadastro
    req.login(newUser, function(err) {
      if (err) { return next(err); }
      return;
    });

    res.json({user: newUser});
  }
};

// Edicao de perfil de usuario

// Solicitação GET para a página de edicao.
exports.userProfileEditGet = async (req, res) => {
  res.render('userProfileEdit', {
        title: 'Edição de Cadastro',
        user: req.user,
        erros: {},
        notification: false,
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
  if (!bcrypt.compareSync(req.body.password_old, req.user.password)){
    erros.password_old = "Senha anterior não confere!";
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

  if(Object.keys(erros).length) {
    // Renderiza página se houver erros
    res.render('userProfileEdit', {
      title: 'Edição de Cadastro',
      user: req.user,
      erros: erros,
      inputs: req.body,
      notification: false,
    });
  }
  else {
    UserAccess.updateUser({
      "name": req.body.name,
      "role": 'USER',
      "email": req.body.email,
      "password": bcrypt.hashSync(req.body.password, 10),
      "id": req.user.id,
    });
    // Renderiza página
    res.render('userProfileEdit', {
      title: 'Edição de Cadastro',
      user: req.user,
      erros: {},
      notification: true,
    });
  }
};

exports.siginPost = async (req, res, next) => {
  passport.authenticate('local', function(err, user) {
    if (err) {  return next(err); }
    // E-mail ou senha incorretos
    if (!user) { 
      return res.status(401).json({ "status": "erro", "message": "E-mail ou senha incorretos"});
    }
    // Cria a sessão
    req.login(user, function(err) {
      if (err) { return next(err); }
      return res.json({ "status": "ok"});
    });
  })(req, res, next);
};

exports.sigoutGet = (req, res) => {
  req.logout();
  res.redirect('/');
}