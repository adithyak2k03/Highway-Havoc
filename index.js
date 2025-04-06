document.addEventListener("DOMContentLoaded", () => {
  const car = document.querySelector(".car");
  const track = document.querySelector(".track");
  const trees = document.querySelector(".trees");
  const wheels = document.querySelectorAll(".wheel img");
  const sky = document.querySelector(".sky"); // If clouds exist
  const carModelSelect = document.getElementById("car-model");

  let carX = 444; // Initial X position of the car
  let carY = 60; // Initial Y position (percentage of track height)
  let isMoving = true; // To track movement state

  const openCustomizeModalBtn = document.getElementById("open-customize-modal");
  const customizeModal = document.getElementById("customize-modal");
  const closeCustomizeModalBtn = document.getElementById(
    "close-customize-modal"
  );

  const openInstructionsModalBtn = document.getElementById(
    "open-instructions-modal"
  );
  const instructionsModal = document.getElementById("instructions-modal");
  const closeInstructionsModalBtn = document.getElementById(
    "close-instructions-modal"
  );

  const openRadioModalBtn = document.getElementById("open-radio-modal");
  const RadioModal = document.getElementById("radio-modal");
  const closeRadioModalBtn = document.getElementById("close-radio-modal");

  if (sky) {
    sky.style.left = "0px"; // Reset clouds if they exist
  }

  carModelSelect.addEventListener("change", (event) => {
    const selectedModel = event.target.value;

    if (selectedModel === "car1") {
      car.style.backgroundImage = "url(./assets/car1_body.png)";
      car.style.width = "407px";
      wheels[0].src = "./assets/car1_wheel_left.png";
      wheels[0].style.width = "90px";
      wheels[0].style.top = "35px";
      wheels[0].style.left = "22px";
      wheels[1].src = "./assets/car1_wheel_right.png";
      wheels[1].style.width = "90px";
      wheels[1].style.top = "-57px";
      wheels[1].style.left = "275px";
    } else if (selectedModel === "car2") {
      car.style.backgroundImage = "url(./assets/car2_body.png)";
      car.style.width = "380px";
      wheels[0].src = "./assets/car2_wheel_left.png";
      wheels[0].style.width = "90px";
      wheels[0].style.top = "35px";
      wheels[0].style.left = "25px";
      wheels[1].src = "./assets/car2_wheel_right.png";
      wheels[1].style.width = "90px";
      wheels[1].style.top = "-58px";
      wheels[1].style.left = "266px";
    }
  });

  openCustomizeModalBtn.addEventListener("click", () => {
    customizeModal.style.display = "block";
  });

  closeCustomizeModalBtn.addEventListener("click", () => {
    customizeModal.style.display = "none";
  });

  openInstructionsModalBtn.addEventListener("click", () => {
    instructionsModal.style.display = "block";
  });

  closeInstructionsModalBtn.addEventListener("click", () => {
    instructionsModal.style.display = "none";
  });

  openRadioModalBtn.addEventListener("click", () => {
    RadioModal.style.display = "block";
  });

  closeRadioModalBtn.addEventListener("click", () => {
    RadioModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === customizeModal) {
      customizeModal.style.display = "none";
    }
    if (event.target === instructionsModal) {
      instructionsModal.style.display = "none";
    }
  });

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
