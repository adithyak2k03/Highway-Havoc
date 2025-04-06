let player;
let isMuted = false;

// This function creates an <iframe> (and YouTube player) after the API code downloads.
// function onYouTubeIframeAPIReady() {
//   player = new YT.Player("player", {
//     height: "200", // Minimum height to ensure it is visible and functional
//     width: "200", // Minimum width to ensure it is visible and functional
//     playerVars: {
//       listType: "playlist",
//       list: "PLdFpHXXZJ3ANbMZT9QGrWEQNSyDHK4z_i", // Your YouTube playlist ID
//       autoplay: 0, // Autoplay set to 0 to comply with browser restrictions
//       controls: 0,
//       loop: 1,
//       shuffle: 1,
//     },
//     events: {
//       onReady: onPlayerReady,
//       onStateChange: onPlayerStateChange,
//     },
//   });
// }

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "360",
    width: "640",
    videoId: "LMuDrj5BpM0", // Sample video ID
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
  // Event listeners for play, pause, and mute buttons
  document.getElementById("play-audio").addEventListener("click", () => {
    player.playVideo();
  });

  document.getElementById("pause-audio").addEventListener("click", () => {
    player.pauseVideo();
  });

  document.getElementById("mute-audio").addEventListener("click", () => {
    isMuted = !isMuted;
    if (isMuted) {
      player.mute();
      document.getElementById("mute-audio").textContent = "Unmute";
    } else {
      player.unMute();
      document.getElementById("mute-audio").textContent = "Mute";
    }
  });
}

// The API calls this function when the player's state changes.
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    player.playVideo();
  }
}

// Stop the video
function stopVideo() {
  player.stopVideo();
}
