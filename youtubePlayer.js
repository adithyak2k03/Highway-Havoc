let player;
let isPlaying = false;
let isMuted = false;
let previousVolume = 100; // default

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "360",
    width: "640",
    playerVars: {
      listType: "playlist",
      list: "PLdFpHXXZJ3ANbMZT9QGrWEQNSyDHK4z_i", // 🔁 Replace with your playlist ID
      controls: 0,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerReady(event) {
  player.setVolume(previousVolume);
  document.getElementById("volumeSlider").value = previousVolume;
  updateVideoTitle();
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    isPlaying = true;
    document.getElementById("playPauseBtn").innerText = "⏸️ Pause";
  } else if (
    event.data === YT.PlayerState.PAUSED ||
    event.data === YT.PlayerState.ENDED
  ) {
    isPlaying = false;
    document.getElementById("playPauseBtn").innerText = "▶️ Play";
  }

  updateVideoTitle();
}

function togglePlayPause() {
  if (isPlaying) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
}

function nextVideo() {
  player.nextVideo();
}

function prevVideo() {
  player.previousVideo();
}

function changeVolume(val) {
  val = parseInt(val);
  player.setVolume(val);

  if (val === 0) {
    isMuted = true;
    document.getElementById("muteIcon").innerText = "🔇";
  } else {
    isMuted = false;
    document.getElementById("muteIcon").innerText = "🔊";
    previousVolume = val; // update last good volume
  }
}

function toggleMute() {
  if (isMuted) {
    player.unMute();
    isMuted = false;
    player.setVolume(previousVolume);
    document.getElementById("volumeSlider").value = previousVolume;
    document.getElementById("muteIcon").innerText = "🔊";
  } else {
    previousVolume = player.getVolume();
    player.mute();
    isMuted = true;
    player.setVolume(0);
    document.getElementById("volumeSlider").value = 0;
    document.getElementById("muteIcon").innerText = "🔇";
  }
}

function updateVideoTitle() {
  setTimeout(() => {
    const videoData = player.getVideoData();
    document.getElementById("video-title").innerText =
      videoData.title || "No Title";
  }, 500);
}
