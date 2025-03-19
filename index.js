document.addEventListener("DOMContentLoaded", () => {
  const car = document.querySelector(".car");
  const track = document.querySelector(".track");
  const trees = document.querySelector(".trees");
  const wheels = document.querySelectorAll(".wheel img");
  const sky = document.querySelector(".sky"); // If clouds exist

  let carX = 444; // Initial X position of the car
  let carY = 60; // Initial Y position (percentage of track height)
  let isMoving = true; // To track movement state

  if (sky) {
    sky.style.left = "0px"; // Reset clouds if they exist
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      carX += 10; // Move right
    } else if (event.key === "ArrowLeft") {
      carX -= 10; // Move left
    } else if (event.key === "ArrowUp") {
      carY += 10;
      //   carY = Math.max(0, carY + 5); // Move up
    } else if (event.key === "ArrowDown") {
      carY -= 10;
      //   carY = Math.min(50, carY - 5); // Move down
    } else if (event.key === " ") {
      isMoving = !isMoving; // Toggle movement state

      if (isMoving) {
        track.style.animationPlayState = "running";
        trees.style.animationPlayState = "running";
        wheels.forEach((wheel) => (wheel.style.animationPlayState = "running"));
      } else {
        track.style.animationPlayState = "paused";
        trees.style.animationPlayState = "paused";
        car.style.animationPlayState = "paused";
        wheels.forEach((wheel) => (wheel.style.animationPlayState = "paused"));
      }
    }

    // Keep car within screen width
    carX = Math.max(50, Math.min(window.innerWidth - 400, carX));

    // Keep car within track height (60vh)
    carY = Math.max(0, Math.min(75, carY));

    let carBottom = 3 + (60 * carY) / 100; // Convert % to vh
    car.style.left = `${carX}px`;
    car.style.bottom = `${carBottom}vh`;
  });
});
