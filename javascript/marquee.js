var loading = null;

function clone() {
	loading = true;

	let marquee = document.querySelector(".marquee");
	let content = document.getElementById("content");
	let contentClone = content.cloneNode(true);
	
	contentClone.id = "contentClone";
	marquee.appendChild(contentClone);

	content.style.animationPlayState = "running";
	contentClone.style.animationPlayState = "running";

	console.log("marquee content cloned");
}

function pause() {
	if (loading == false) {
		let content = document.getElementById("content");
		let contentClone = document.getElementById("contentClone");
	
		content.style.animationPlayState = "paused";
		contentClone.style.animationPlayState = "paused";

		console.log("marquee paused");
	}
}

function unpause() {
	if (loading == false) {
		let content = document.getElementById("content");
		let contentClone = document.getElementById("contentClone");
	
		content.style.animationPlayState = "running";
		contentClone.style.animationPlayState = "running";

		console.log("marquee unpaused");
	}
}

window.onload = function() {
	clone();

	loading = false;
}