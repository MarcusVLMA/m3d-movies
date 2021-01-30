// Define o tema
if (localStorage.getItem('theme') === 'high-contrast') {
  setTheme('high-contrast');
} else {
  setTheme('common');
}
// Recupera o tamanho da fonte salva
setFontSize(parseInt(localStorage.getItem('fontSize')));

document.onreadystatechange = function(e)
{
    if (document.readyState === 'complete')
    {
      if (localStorage.getItem('theme') === 'high-contrast') {
        setTheme('high-contrast');
      } else {
        setTheme('common');
      }
      // Recupera o tamanho da fonte salva
      setFontSize(parseInt(localStorage.getItem('fontSize')));
    }
};

// Troca o tema
document.querySelector("a.contrast").addEventListener('click', () => {
  if (localStorage.getItem('theme') === 'high-contrast') {
    setTheme('common');
  } else {
    setTheme('high-contrast');
  }
});

// Aumenta o tamanho da fonte
document.querySelector("a.font-size-increase").addEventListener('click', () => {
  setFontSize(parseInt(getComputedStyle(document.body).getPropertyValue('font-size')) + 2);
});

// Diminui o tamanho da fonte
document.querySelector("a.font-size-decrease").addEventListener('click', () => {
  setFontSize(parseInt(getComputedStyle(document.body).getPropertyValue('font-size')) - 2);
});

function setTheme(themeName) {
  localStorage.setItem('theme', themeName);
  document.documentElement.className = themeName;
}

function setFontSize(fontSize) {
  if (fontSize >= 16 && fontSize <= 24) {
    document.querySelector('.accessibility').style.fontSize = fontSize + 'px';
    localStorage.setItem('fontSize', fontSize);
  }
}