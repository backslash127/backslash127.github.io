const isIFrame = typeof window !== 'undefined' && window.self !== window.top;

if (isIFrame == true) {
    window.top.location.replace("https://" + location.hostname + "/404");
};

if (window.location != "https://" + location.hostname + "/404") {
    window.location.replace("https://" + location.hostname + "/404");
};

document.addEventListener("keypress", function(event) {
    window.location.replace("https://" + location.hostname + "/?p=/home");
});