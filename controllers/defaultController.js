const { UserAccess, MovieAccess } = require("../database");

// Renderiza a HOME
exports.home = (req, res) => {
  res.render('home', {
    title: 'Home'
  });
};

// Solicitação GET para a página de cadastro.
exports.registrationGet = (req, res) => {
  res.render('registration', {
    title: 'Cadastro'
  });
};

// Verfica se o e-mail ja existe
exports.emailAvailable = (req, res) => {
  console.log(req.params.userEmail);
  if (UserAccess.findUser({ email: req.params.userEmail })){
    res.json({ 'available': 'false'});
  }
  else{
    res.json({ 'available': 'true'});
  }
};

// Solicitação POST para registrar usuário.
exports.registrationPost = (req, res) => {
  res.render('registration', {
    title: 'Cadastro'
  });
};