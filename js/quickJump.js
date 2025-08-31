function toBottom() {
	document.getElementById("mainContent").scrollTo({
		top: document.getElementById("mainContent").scrollHeight,
		left: 0,
		behavior: "smooth",
	});
	console.log("bottom");
}

function toTop() {
	document.getElementById("mainContent").scrollTo({
		top: 0,
		left: 0,
		behavior: "smooth",
	});
	console.log("top");
}