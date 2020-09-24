var el = document.getElementById("graph"); // get canvas

var options = {
  percent: el.getAttribute("data-percent") || 25,
  size: el.getAttribute("data-size") || 78,
  lineWidth: el.getAttribute("data-line") || 2,
  rotate: el.getAttribute("data-rotate") || 0,
};

var canvas = document.createElement("canvas");

if (typeof G_vmlCanvasManager !== "undefined") {
  G_vmlCanvasManager.initElement(canvas);
}

var ctx = canvas.getContext("2d");
canvas.width = canvas.height = options.size;

el.appendChild(canvas);

ctx.translate(options.size / 2, options.size / 2); // change center
ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

//imd = ctx.getImageData(0, 0, 240, 240);
var radius = (options.size - options.lineWidth) / 2;

var drawCircle = function (color, lineWidth, percent) {
  percent = Math.min(Math.max(0, percent || 1), 1);
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
  ctx.strokeStyle = color;
  ctx.lineCap = "round"; // butt, round or square
  ctx.lineWidth = lineWidth;
  ctx.stroke();
};

drawCircle("#1C4027", options.lineWidth, 100 / 100);
drawCircle("#13f513", options.lineWidth, options.percent / 10);

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = parseFloat(slider.value) / 10;

function postAvaliation(event) {
  console.log("Teste");
  output.innerHTML = parseFloat(event.target.value) / 10;
  // fetch("/title/" + title_id, {
  //   method: "Post",
  //   body: JSON.stringify({
  //     entry: this.value,
  //     title_id: title_id,
  //     type: type,
  //   }),
  // }).then((response) => {
  //   if (!response.ok) {
  //     throw new Error("Erro de conexão!");
  //   }
  //   return response.json();
  // });
}

function teste() {
  alert("AAAAAAAAAAAAAAA");
}

// slider.oninput = async function (event) {
//   output.innerHTML = parseFloat(this.value) / 10;
//   fetch('/title/<%= title_id %>', {
//     method: 'Post',
//     body: JSON.stringify({
//       entry: event.target.value,
//       title_id: <%= title_id %>,
//       type: <%= type %>,
//     }),
//   }).then(response => {
//     if (!response.ok) {
//       throw new Error('Erro de conexão!');
//     }
//     return response.json();
//   })
// }
