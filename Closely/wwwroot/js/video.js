//var video = document.getElementById("video-player");
//var bar = document.querySelector('.green-bar');
var btn = document.getElementById("play-pause");
btn.className = 'play';

var player;

function onYouTubePlayerAPIReady() {
    player = new YT.Player('video-player', {
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {

    btn.onclick = function () {
        togglePlayPause();
    };
}

function togglePlayPause() {
    if (btn.className == 'play') {
        btn.className = 'pause';
        player.playVideo();
    }
    else {
        btn.className = 'play';
        player.pauseVideo();
    }
}


// Inject YouTube API script
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);