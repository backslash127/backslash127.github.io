var loading = null;

function init() {
	loading = true;

	let marquee = document.querySelector(".marquee");
	let content = document.querySelector(".marqueeContent");
	let contentList = document.querySelectorAll(".marqueeContent");
	let contentClone = content.cloneNode(true)

	let contentWidth = content.scrollWidth;
	let rate = 75; // pixels per second
	
	let animationDuration = contentWidth / rate;
	content.style.setProperty("--animation-duration", `${animationDuration}s`);
	contentClone.style.setProperty("--animation-duration", `${animationDuration}s`);

	marquee.appendChild(contentClone);
	contentClone.style.animationPlayState = "running";

	contentList.forEach(content => content.style.animationPlayState = "running");

	console.log("marquee content cloned");
}

function pause() {
	if (loading == false) {
		let contentList = document.querySelectorAll(".marqueeContent");
		contentList.forEach(content => content.style.animationPlayState = "paused");

		console.log("marquee paused");
	}
}

function play() {
	if (loading == false) {
		let contentList = document.querySelectorAll(".marqueeContent");
		contentList.forEach(content => content.style.animationPlayState = "running");

		console.log("marquee unpaused");
	}
}

window.onload = function() {
	init();

	loading = false;
}