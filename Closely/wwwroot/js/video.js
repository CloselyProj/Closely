//var video = document.getElementById("video-player");
var bar = document.getElementById('color-bar');
var greenbar = document.getElementById('green-bar');
var btn = document.getElementById("play-pause");
var time = document.getElementById("video-time");
var hovertime = document.getElementById("hover-time");
btn.className = 'play';

var player;
var ismouseover = false;

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
    bar.addEventListener('mousemove', function () {
        hovertime.style.display = 'block';
        HoverTime();
    });
    bar.addEventListener('mouseleave', function () {
        hovertime.style.display = 'none';
    });
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
    SetVideoTime();

}

// Перемотка видео
function SeekBar() {
    let { left } = event.target.getBoundingClientRect();

    let needPercent = ((event.clientX - left) / 1000);
    player.seekTo(player.getDuration() * needPercent, true);

    if (btn.className == 'play')
        player.pauseVideo();
}

//Вывод времени видео
function SetVideoTime() {
    let current = GetVideoTime(player.getCurrentTime());
    let duration = GetVideoTime(player.getDuration());
    time.innerHTML = `${current}/${duration}`;
}
//Получение текущего времени видео
function GetVideoTime(time) {
    return `${Math.floor(time / 60)}:${FormatTime(Math.floor(time % 60))}`;
}

//Нужен ли ноль перед числом
function FormatTime(num) {
    return num < 10 ? `0${num}` : `${num}`;
}

//Вывод времени при наведении на прогресс бар
function HoverTime() {
    let { left }  = event.target.getBoundingClientRect();

    let needPercent = ((event.clientX - left) / 1000);
    let duration = player.getDuration() * needPercent;
    hovertime.innerHTML = `${GetVideoTime(duration)}`;

    hovertime.style.left = `${event.clientX - (left + (hovertime.offsetWidth / 2))}px`;
}

// Inject YouTube API script
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);