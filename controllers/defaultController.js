// Renderiza a HOME
exports.home = (req, res) => {
  res.render('home', {
    title: 'Home'
  });
};