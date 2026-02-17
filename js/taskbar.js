const timeDisplay = document.querySelector("#clock");
const startButton = document.querySelector("#startButton");
const startMenu = document.querySelector("#startMenu");

let menuVisible = false

function updateTime() {
    const timeOptions = {
        hour:"2-digit",
        hour12:true,
        minute:"2-digit"
    };

    let localTime = new Date().toLocaleTimeString("en-US", timeOptions);
    timeDisplay.innerHTML = localTime;
};
setInterval(updateTime, 1000);

function toggleStartMenu() {
    if (menuVisible == false) {
        menuVisible = true;

        startMenu.style.display = "flex";
        startButton.style.borderColor = "#725296 #c088c2 #c088c2 #725296";
    } else {
        menuVisible = false;

        startMenu.style.display = "none";
        startButton.style.borderColor = "#c088c2 #725296 #725296 #c088c2";
    };
};