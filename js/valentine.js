const noArea = document.querySelector(".no-area");
const noButton = document.querySelector("#no-button");
const yesButton = document.querySelector("#yes-button");
const romanceScene = document.querySelector(".romance-scene");
const fallingRoses = document.querySelector(".falling-roses");

function spawnRoses(count = 18) {
  if (!fallingRoses) return;
  fallingRoses.innerHTML = "";
  for (let i = 0; i < count; i += 1) {
    const rose = document.createElement("div");
    rose.className = "rose";
    const left = Math.random() * 100;
    const size = 22 + Math.random() * 24;
    const delay = Math.random() * 0.6;
    const duration = 4.2 + Math.random() * 2.6;
    rose.style.setProperty("--rose-left", `${left}vw`);
    rose.style.setProperty("--rose-size", `${size}px`);
    rose.style.setProperty("--fall-delay", `${delay}s`);
    rose.style.setProperty("--fall-duration", `${duration}s`);
    fallingRoses.appendChild(rose);
  }
}

function placeNoButton(button) {
  if (!noArea) return;
  const padding = 16;
  const areaRect = noArea.getBoundingClientRect();
  const btnRect = button.getBoundingClientRect();
  const maxX = Math.max(padding, areaRect.width - btnRect.width - padding);
  const maxY = Math.max(padding, areaRect.height - btnRect.height - padding);
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;
  button.style.position = "absolute";
  button.style.left = `${x}px`;
  button.style.top = `${y}px`;
}

if (noButton && noArea) {
  noButton.addEventListener("click", (event) => {
    event.preventDefault();
    placeNoButton(noButton);
    const clone = noButton.cloneNode(true);
    clone.addEventListener("click", (cloneEvent) => {
      cloneEvent.preventDefault();
      placeNoButton(clone);
    });
    noArea.appendChild(clone);
    placeNoButton(clone);
  });
}

if (yesButton) {
  yesButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (romanceScene) {
      romanceScene.classList.add("active");
    }
    spawnRoses();
    setTimeout(() => {
      window.location.href = "final.html";
    }, 1600);
  });
}
