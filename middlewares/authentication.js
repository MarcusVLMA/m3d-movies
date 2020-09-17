const { json } = require("express");

// Requer que o usuário esteja logado
function authenticated () {  
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }

    if (req.method === 'GET'){
      res.redirect('/');
    }
    else {
      res.status(401).json({erro: 'Unauthorized'});
    }
  }
};

// Requer que o usuário NÃO esteja logado
function unauthenticated () {
  return (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    }

    if (req.method === 'GET'){
      res.redirect('/');
    }
    else {
      res.status(405).json({erro: 'Not Allowed'});
    }
  }
};

// Requer que o usuário seja administrador
function adminArea () {  
  return (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === "ADMIN") {
      return next();
    }

    if (req.method === 'GET'){
      res.redirect('/');
    }
    else {
      res.status(401).json({erro: 'Unauthorized'});
    }
  }
};

module.exports = {
  authenticated,
  unauthenticated,
  adminArea
};
