
function fonte(e) {
	var elemento = $(".acessibilidade");
	var fonte = parseInt(elemento.css('font-size'));
	if (e == 'aPlus') {
		fonte++;
	}
	if (e == 'aMinus'){
		fonte--;
	}
	elemento.css("fontSize", fonte);
}
