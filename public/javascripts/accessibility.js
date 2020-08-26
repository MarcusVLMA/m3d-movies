(function () {
  if (localStorage.getItem('theme') === 'high-contrast') {
    setTheme('high-contrast');
  } else {
    setTheme('common');
  }
})();

function setTheme(themeName) {
  localStorage.setItem('theme', themeName);
  document.documentElement.className = themeName;
}

// Troca o tema
$("a.contrast").click(function()
  {
    if (localStorage.getItem('theme') === 'high-contrast') {
      setTheme('common');
    } else {
      setTheme('high-contrast');
    }
  }
);

// Aumenta o tamanho da fonte
$("a.font-size-increase").click(function()
  {
    var elemento = $(".accessibility");
    var fonte = parseInt(elemento.css('font-size'));
    fonte++;
    elemento.css("fontSize", fonte);
  }
);

// Diminui o tamanho da fonte
$("a.font-size-decrease").click(function()
  {
    var elemento = $(".accessibility");
    var fonte = parseInt(elemento.css('font-size'));
    fonte--;
    elemento.css("fontSize", fonte);
  }
);