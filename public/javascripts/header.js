const headerSearchbar = document.getElementById("header-searchbar");

if(headerSearchbar) {
  headerSearchbar.addEventListener("keyup", function (e) {
    var key = e.which || e.keyCode;
    if (key == 13) {
      window.location.href = `/title/search?title=${this.value}`;
    }
  });
}