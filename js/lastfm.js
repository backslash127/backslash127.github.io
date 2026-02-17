// this script is under the MIT license (https://max.nekoweb.org/resources/license.txt)

const USERNAME = "backslash127"; // Put your LastFM username here
const BASE_URL = `https://lastfm-last-played.biancarosa.com.br/${USERNAME}/latest-song`;

const getTrack = async () => {
    const request = await fetch(BASE_URL);
    const json = await request.json();
    let status

    let isPlaying = json.track['@attr']?.nowplaying || false;

    if(!isPlaying) {
        // Trigger if a song isn't playing
        return;
    } else {
        // Trigger if a song is playing
    }

    // Values:
    // COVER IMAGE: json.track.image[1]['#text']
    // TITLE: json.track.name
    // ARTIST: json.track.artist['#text']

    document.getElementById("listening").innerHTML = `
    <div id="trackInfo">
        <p id="trackName"><strong>${json.track.name}</strong></p>
        <p id="artistName">${json.track.artist['#text']}</p>
        <p id="albumName"><em>${json.track.album['#text']}</em></p>
    </div>
    <img src="${json.track.image[3]['#text']}">
    `
};

getTrack();
setInterval(() => { getTrack(); }, 10000);