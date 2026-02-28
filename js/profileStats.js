let username = "Backslash"

let moodText = "still tired..";
let activityText = "chillin'";

function setUsername() {
    let usernameElement = document.querySelectorAll(".username");

    usernameElement.forEach((item) => {
        item.innerHTML = username;
    });

    console.log("username updated");
};

function setMood() {
    let moodElement = document.querySelectorAll("#moodStat");

    moodElement.forEach((item) => {
        item.innerHTML = "<strong>Mood</strong> : " + moodText;
    });

    console.log("mood updated");
};

function setActivity() {
    let activityElement = document.querySelectorAll("#activityStat");

    activityElement.forEach((item) => {
        item.innerHTML = "&quot;" + activityText + "&quot;";
    });

    console.log("activity updated");
};

function setWebspaceTag() {
    let urlElement = document.querySelector("#urlTag");

    urlElement.innerHTML = document.location.origin;

    console.log("webspace url updated");
};

function updateStats() {
    setUsername();
    setMood();
    setActivity();

    setWebspaceTag();
};

document.addEventListener("DOMContentLoaded", updateStats);