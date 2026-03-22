const isIFrame = typeof window !== 'undefined' && window.self !== window.top;

if (isIFrame == true) {
    window.top.location.replace("./404");
};

document.addEventListener("keypress", function(event) {
    window.location.replace("./?p=/home");
});