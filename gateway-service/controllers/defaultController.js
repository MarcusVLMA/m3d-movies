const database = require("../database");

// Renderiza a HOME
exports.home = (req, res) => {
  res.render("home", {
    title: "Home",
    user: req.user,
  });
};
