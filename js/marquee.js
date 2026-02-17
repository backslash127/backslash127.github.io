var loading = null;

function marqueeInit() {
    loading = true;

    let marquee = document.querySelector(".marquee");
    let marqueeContent = document.querySelector(".marqueeContent");
    let contentList = document.querySelectorAll(".marqueeContent");
    let contentClone = marqueeContent.cloneNode(true);

    let contentWidth = marqueeContent.scrollWidth;
    let rate = 75; // pixels per second

    let animationDuration = contentWidth / rate;
    marqueeContent.style.setProperty("--marqueeDuration", `${animationDuration}s`); // sets the css variable to the animation duration
    contentClone.style.setProperty("--marqueeDuration", `${animationDuration}s`); // sets the css variable to the animation duration

    marquee.appendChild(contentClone); // parents the cloned content into the marquee element

    contentClone.style.animationPlayState = "running"; // sets the play state of the marque animation
    contentList.forEach(item => item.style.animationPlayState = "running"); // sets the play state of the marque animation for each found marquee content element

    console.log("marquee initialized")
};

function marqueePause() { // self explanatory
    if (loading == false) {
        let contentList = document.querySelectorAll(".marqueeContent");
        contentList.forEach(item => item.style.animationPlayState = "paused");

        console.log("marquee paused");
    };
};

function marqueePlay() { // self explanatory
    if (loading == false) {
        let contentList = document.querySelectorAll(".marqueeContent");
        contentList.forEach(item => item.style.animationPlayState = "running");

        console.log("marquee unpaused");
    };
};

window.onload = function() {
    marqueeInit(); // self explanatory

    loading = false; // sets loading to false
};