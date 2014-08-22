var $;
window.onresize = update;

window.onload = function() {
	$ = function(el) { return document.querySelector(el); };
	update();
};

function update() {
	$("#parent").style.top = "calc(50% - " + $("#wrapper").getBoundingClientRect().height + "px / 2)";
}