
const audio = document.getElementById('myAudio');
const video = document.getElementById('myVideo');
const audioTimer = document.getElementById('audioTime');
const videoTimer = document.getElementById('videoTime');

//format time in M:S
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;    //template literal used (ES6)
}

// Update audio timer
audio.addEventListener('timeupdate', () => {
    audioTimer.textContent = formatTime(audio.currentTime);
});

// Update video timer
video.addEventListener('timeupdate', () => {
    videoTimer.textContent = formatTime(video.currentTime);
});