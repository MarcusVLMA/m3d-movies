const headerSearchbar = document.getElementById("header-searchbar");
const navbar = document.getElementById("navbar");
const searchbarIcon = document.getElementById("searchbar-icon");

if(headerSearchbar) {
  headerSearchbar.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      window.location.href = `/title/search?title=${this.value}`;
    }
  });
}

// Animação da Barra
let prevScrollpos = window.pageYOffset;
window.addEventListener("scroll", (e) =>{
  if (localStorage.getItem('theme') !== 'high-contrast') {
    navbar.style.top = prevScrollpos > window.pageYOffset ? "0" : "-50px";
    prevScrollpos = window.pageYOffset;
  }
});

navbar.addEventListener("mouseenter", (e) =>{
  navbar.style.top = "0";
});