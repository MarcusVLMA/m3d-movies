function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}
function toggleTheme() {
    if (localStorage.getItem('theme') === 'high-contrast') {
        setTheme('common');
    } else {
        setTheme('high-contrast');
    }
}
(function () {
    if (localStorage.getItem('theme') === 'high-contrast') {
        setTheme('high-contrast');
    } else {
        setTheme('common');
    }
})();