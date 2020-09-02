const inputElement = document.getElementById("header-searchbar");

inputElement.addEventListener("keyup", function (e) {
  var key = e.which || e.keyCode;
  if (key == 13) {
    window.location.href = `/title/gallery/0?search=${this.value}`;
  }
});
