function init() {
    console.log("tabs loaded");
    changeURL();
};

function updateTabs() {
    changeURL();

    const tabs = document.querySelectorAll(".tab");
    const mainIFrame = document.querySelector("#mainIFrame");
    const iFramePath = mainIFrame.contentWindow.location.pathname.split(".html").join("");
    const activeTab = document.querySelector(".active");

    if (!iFramePath.includes(activeTab.getAttribute("href").split(".html").join(""))) { // checks if the pathname of the iframe DOESN'T incluide the href of the currently active tab
        activeTab.classList.remove("active"); // removes the `.active` class from any element that has it

        tabs.forEach((item) => { // runs through each item of "const tabs = document.querySelectorAll(".tab");"
            if (iFramePath.includes(item.getAttribute("href").split(".html").join(""))) { // checks if the pathname of the iframe DOES incluide the href of every item
                // console.log("matching item href : " + item.getAttribute("href").split(".html").join(""));
                // console.log("iframe path : " + iFramePath)

                item.classList.add("active"); // adds the `.active` class to the matching item
            };
        });
    };
};

function changeURL() {
    const mainIframe = document.querySelector("#mainIFrame");
    const urlText = document.querySelector(".urlBox p");

    if (mainIframe) {
        urlText.innerHTML = mainIframe.contentWindow.location.href.split(".html").join(""); // changes the cosmetic address bar to match the actual url of the iframe
    };

    console.log("updated URL");
};

window.onload = init(); // self explanatory