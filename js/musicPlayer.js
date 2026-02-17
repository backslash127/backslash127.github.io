// code heavily based off the music player from https://adilene.net/ so big shoutouts!!!
// you're allowed to take my code but i honestly don't recommend it, this script is a fucking mess

let trackTitle = document.querySelector("#trackTitle");
let trackAlbum = document.querySelector("#trackAlbum");
let albumCover = document.querySelector("#albumCover");

let playbackButton = document.querySelector("#playbackButton");
let backButton = document.querySelector("#backButton");
let forwardButton = document.querySelector("#forwardButton");
let volumeButton = document.querySelector("#volumeButton");

let volumeSlider = document.querySelector("#volumeSlider");
let volumePercentage = document.querySelector("#volumePercentage");
let playbackSlider = document.querySelector("#playbackSeeker");
let playbackTime = document.querySelector("#playbackTime");
let trackDuration = document.querySelector("#trackDuration");
let playlistElement = document.querySelector("#playlist");

let trackIndex = 0;
let playbackState = "paused";
let currentVolume;
let muted = false;
let updateTimer;

let currentTrack = document.querySelector("#audioPlayer");
setVolume();

let playlist = [ // the list of tracks to play

];

function loadTrack(trackIndex) {
    clearInterval(updateTimer);
    resetValues();

    // load the track
    currentTrack.src = playlist[trackIndex].filePath;
    currentTrack.load();

    // update track details
    trackTitle.textContent = playlist[trackIndex].name + " - " + playlist[trackIndex].artist;
    trackAlbum.textContent = playlist[trackIndex].album;
    albumCover.src = playlist[trackIndex].albumCover;

    // 1000ms interval for the playback slider
    updateTimer = setInterval(updateSeekTime, 1000);

    // play the next track after current one ends
    currentTrack.addEventListener("ended", nextTrack);

    updateActiveTrack();
};

function resetValues() {
    playbackTime.textContent = "00:00";
    trackDuration.textContent = "00:00";
    playbackSlider.value = 0;
};

updatePlaylist([  // this is just the initial playlist i want to have loaded when the page first loads
    {
        name:'Imposter Syndrome', artist:'Sidney Gish', album:'No Dogs Allowed',
        albumCover:'media/pages/gallery/music/initialSong/cover.png',
        filePath:'media/pages/gallery/music/initialSong/audio.mp3'
    },
]);

function updatePlaylist(newPlaylist) {
    playlist.length = 0; // clears the playlist array
    playlistElement.innerHTML = ""; // clears the <ul> element of all children

    playlist = newPlaylist; // sets the playlist array to the new playlist send in
    trackIndex = 0;

    pauseTrack();
    loadTrack(trackIndex);
    createPlaylist();
    setVolume();
};

function togglePlayback() {
    if (playbackState == "paused") { // detects if music is paused
        playTrack(); // if it is, run the play function
    } else { // otherwise?
        pauseTrack(); // ...run the pause function
    };

    console.log("music : " + playbackState);
};

function playTrack() {
    currentTrack.play();
    playbackState = "playing"

    playbackButton.querySelector("img").src = "media/windowGraphics/musicPlayer/pause.png" // set button image to pause
};

function pauseTrack() {
    currentTrack.pause();
    playbackState = "paused"

    playbackButton.querySelector("img").src = "media/windowGraphics/musicPlayer/play.png" // set button image to play
};

function nextTrack() {
    if (trackIndex < playlist.length - 1) { // detects if the current track index is less than the length of the playlist
        trackIndex += 1; // add 1 to the index
    } else { // ...otherwise?
        trackIndex = 0; // set index back to the first song of the playlist
    };

    loadTrack(trackIndex); // loads the track corresponding to the track index
    if (playbackState == "playing") { // detects if playback is playing
        playTrack(); // plays the newly loaded track
    };
};

function previousTrack() {
    if (trackIndex > 0) { // detects if the current track index is anything but the FIRST in the playlist
        trackIndex -= 1; // subtract 1 from the index
    } else { // ...otherwise?
        trackIndex = playlist.length - 1; // set the track index to the LAST song of the playlist
    };

    loadTrack(trackIndex); // loads the track corresponding to the track index
    if (playbackState == "playing") { // detects if playback is playing
        playTrack(); // plays the newly loaded track
    };
};

function seekTo() {
    seekTime = currentTrack.duration * (playbackSlider.value / 100); // sets the seek time to the tracks duration and the seek slider's value
    currentTrack.currentTime = seekTime; // sets the current track's current time to the seek time

    updateSeekTime();
};

function setVolume() {
    currentTrack.volume = volumeSlider.value / 100; // sets the current track's volume to the value of the volume slider
    currentVolume = currentTrack.volume; // stores the current track's volume

    updateVolumeVisuals();
};

function updateVolumeVisuals() {
    if (currentTrack.volume < 10 / 100) { // if the volume of the current track is below 10%
        volumeButton.querySelector("img").src = "media/windowGraphics/musicPlayer/volumeMute.png";

    } else if (currentTrack.volume < 50 / 100) { // if the volume of the current track is above 10%
        volumeButton.querySelector("img").src = "media/windowGraphics/musicPlayer/volumeHalf.png";

    } else if (currentTrack.volume > 50 / 100) { // if the volume of the current track is above 50%
        volumeButton.querySelector("img").src = "media/windowGraphics/musicPlayer/volumeFull.png";

    };

    volumePercentage.textContent = Math.round(currentTrack.volume * 100) + "%"; // updates the number display
    volumeSlider.value = currentTrack.volume * 100 // updates the slider
}

function toggleMute() {
    if (muted == false) { // detects if muted is false
        muted = true;

        volumeSlider.value = 0;
        currentTrack.volume = 0;

        updateVolumeVisuals();

    } else { // ...otherwise?
        muted = false;

        // sets the values of each to the previously stored currentVolume
        volumeSlider.value = currentVolume;
        currentTrack.volume = currentVolume;

        updateVolumeVisuals();
    };
};

function updateSeekTime() {
    let seekPosition = 0;

    if (!isNaN(currentTrack.duration)) { // detexts if the current track's duration is a number
        seekPosition = currentTrack.currentTime * (100 / currentTrack.duration);
        playbackSlider.value = seekPosition; // sets the seek slider to the seek position

        // mm:ss formatting junk
        let currentMinutes = Math.floor(currentTrack.currentTime / 60);
        let currentSeconds = Math.floor(currentTrack.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(currentTrack.duration / 60);
        let durationSeconds = Math.floor(currentTrack.duration - durationMinutes * 60);

        // appends zeros to single digit numbers
        if (currentSeconds < 10) {currentSeconds = "0" + currentSeconds;};
        if (durationSeconds < 10) {durationSeconds = "0" + durationSeconds;};
        if (currentMinutes < 10) {currentMinutes = "0" + currentMinutes;};
        if (durationMinutes < 10) {durationMinutes = "0" + durationMinutes;};

        playbackTime.textContent = currentMinutes + ":" + currentSeconds;
        trackDuration.textContent = durationMinutes + ":" + durationSeconds;
    };
};

function createPlaylist() {
    playlist.forEach(function(item) { // the inner code runs "for each" item inside the playlist array
        const playlistItem = document.createElement("li"); // creates a new <li> html element
        playlistItem.classList.add("playlistItem"); // adds the tag ".playlistItem" to the newly created element

        playlistItem.textContent = item.name; // inserts the name of the item inside the <li>
        playlistItem.addEventListener("click", function() { // adds an event to detect when an <li> is clicked
            trackIndex = Array.from(playlistItem.parentElement.children).indexOf(playlistItem); // sets the track index to the clicked <li>

            updateActiveTrack();
            loadTrack(trackIndex);
            if (playbackState == "playing") { // detects if playback is playing
                playTrack(); // plays the newly loaded track
            };
        });

        playlistElement.appendChild(playlistItem); // parents the <li> elements into the "#playlist" tagged element
        updateActiveTrack();
    });
};

function updateActiveTrack() {
    if (playlistElement.childElementCount > 0) { // detects if the playlist has more than 0 children
        document.querySelectorAll(".activeTrack").forEach(item => item.classList.remove("activeTrack")); // loops through all elements classified as ".activeTrack" and removes that class
        playlistElement.children[trackIndex].classList.add("activeTrack"); // adds the ".activeTrack" class to whatever child of the playlist element shares an index with the current track index

        console.log("now playing : " + playlist[trackIndex].name + " - " + playlist[trackIndex].artist);
    };
};