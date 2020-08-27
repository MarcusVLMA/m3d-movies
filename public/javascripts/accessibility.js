(() => {
  // Recupera o tema salvo
  if (localStorage.getItem('theme') === 'high-contrast') {
    setTheme('high-contrast');
  } else {
    setTheme('common');
  }
  // Recupera o tamanho da fonte salva
  setFontSize(parseInt(localStorage.getItem('fontSize')));
})();

// Troca o tema
$("a.contrast").click(() => {
  if (localStorage.getItem('theme') === 'high-contrast') {
    setTheme('common');
  } else {
    setTheme('high-contrast');
  }
});

// Aumenta o tamanho da fonte
$("a.font-size-increase").click(() => {
    setFontSize(parseInt($(".accessibility").css('font-size')) + 2);
});

// Diminui o tamanho da fonte
$("a.font-size-decrease").click(() => {
    setFontSize(parseInt($(".accessibility").css('font-size')) - 2);
});

function setTheme(themeName) {
  localStorage.setItem('theme', themeName);
  document.documentElement.className = themeName;
}

function setFontSize(fontSize) {
  if (fontSize >= 16 && fontSize <= 24) {
    $(".accessibility").css("fontSize", fontSize);
    localStorage.setItem('fontSize', fontSize);
  }
}