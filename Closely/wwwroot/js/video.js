//var video = document.getElementById("video-player");
var bar = document.getElementById('color-bar');
var greenbar = document.getElementById('green-bar');
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
    bar.onclick = function () {
        SeekBar();
    }
    timeupdater = setInterval(updateTime, 100);
}

// Запуск и пауза
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

// Обновление прогресс бара
function updateTime() {
    var videotime = player.getCurrentTime() / player.getDuration();
    var oldTime = videotime;
    if (videotime !== oldTime) {
        onProgress(videotime);
    }
    else {

        videotime = player.getCurrentTime() / player.getDuration();
        greenbar.style.width = videotime * 100 + "%";
    }
}

// Перемотка видео
function SeekBar() {
    const { left } = event.target.getBoundingClientRect();
    //  const hint = this.player.querySelector('.j-hint');
    // const ghost = this.player.querySelector('.j-line-ghost');

    // hint.innerHTML = this.formatTime(this.calcNeededLine(event, left));
    // hint.style.left = `${event.clientX - (left + (hint.offsetWidth / 2))}px`;
    greenbar.style.width = `${event.clientX - left}px`;

    const needPercent = ((event.clientX - left) / event.target.offsetWidth);
    alert(needPercent);
    player.seekTo(player.getDuration() * needPercent, true);
}

// Inject YouTube API script
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);