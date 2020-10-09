/**
 * custom accessible video control panel
 * Vanilla JS Script
 * Eduardo Estrada 10/09/2020
 */

// declare variables
const playPauseBtn = document.querySelector('.playpause');
const stopBtn = document.querySelector('.stop');
const rwdBtn = document.querySelector('.rwd');
const fwdBtn = document.querySelector('.fwd');
const timeLabel = document.querySelector('.time');
const player = document.querySelector('video');
const fullBtn = document.querySelector('.fullScrn');
const muteBtn = document.querySelector('.volMute');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progress-bar');
const subtitles = document.getElementById('subtitles');

player.removeAttribute('controls');
player.addEventListener('loadedmetadata', function() {
    progress.setAttribute('max', player.duration);
});
player.addEventListener('timeupdate', function() {
    progress.value = player.currentTime;
    progressBar.style.width = Math.floor((player.currentTime / player.duration) * 100) + '%';
});
player.addEventListener('timeupdate', function() {
    if (!progress.getAttribute('max')) progress.setAttribute('max', player.duration);
    progress.value = player.currentTime;
    progressBar.style.width = Math.floor((player.currentTime / player.duration) * 100) + '%';
});

/**
 * Toggle Close Captions
 */
subtitles.onclick = function() {
    let tracks = document.getElementById('one');
    if(tracks != null){
        player.removeChild(tracks);
    }else{
        // add the track back to the video element
        let node = document.createElement("track");
        node.setAttribute("id", "one");  
        node.setAttribute("src", "../standard-captions-example.vtt"); 
        node.setAttribute("label", "English"); 
        node.setAttribute("kind", "captions"); 
        node.setAttribute("srclang", "en-us"); 
        player.append(node);
    }
};

/**
 * Full Screen Option
 */
fullBtn.onclick = function() {
    player.requestFullscreen()
};
/**
 * Mutes Audio
 */
muteBtn.onclick = function() {
    player.muted = !player.muted;
}
/**
 * Toggle play / pause
 */
playPauseBtn.onclick = function() {
    if(player.paused) {
        player.play();
        playPauseBtn.textContent = 'Pause';
    } else {
        player.pause();
        playPauseBtn.textContent = 'Play';
    }
};
/**
 * Stop Video
 */
stopBtn.onclick = function() {
    player.pause();
    player.currentTime = 0;
    playPauseBtn.textContent = 'Play';
};
/**
 * Rewind the video
 */
rwdBtn.onclick = function() {
    player.currentTime -= 3;
};
/**
 * Foward the video
 */
fwdBtn.onclick = function() {
    player.currentTime += 3;
    if(player.currentTime >= player.duration || player.paused) {
        player.pause();
        player.currentTime = 0;
        playPauseBtn.textContent = 'Play';
    }
};
/**
 * Update and display the video time
 */
player.ontimeupdate = function() {
    let minutes = Math.floor(player.currentTime / 60);
    let seconds = Math.floor(player.currentTime - minutes * 60);
    let minuteValue;
    let secondValue;

    if (minutes<10) {
        minuteValue = "0" + minutes;
    } else {
        minuteValue = minutes;
    }

    if (seconds<10) {
        secondValue = "0" + seconds;
    } else {
        secondValue = seconds;
    }

    mediaTime = minuteValue + ":" + secondValue;
    timeLabel.textContent = mediaTime;
};


