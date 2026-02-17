function reloadFrame() {
    let iFrame = document.querySelector("#mainIFrame");

    iFrame.contentWindow.location.reload();

    console.log("reloaded");
};

function historyBack() {
    let iFrame = document.querySelector("#mainIFrame");

    iFrame.contentWindow.history.go(-1); return false;
};

function historyForward() {
    let iFrame = document.querySelector("#mainIFrame");

    iFrame.contentWindow.history.go(1); return false;
};