const canvas = document.getElementById("canvas");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const clearBtn = document.getElementById("clear");
const sizeElement = document.getElementById("size");
const colorElement = document.getElementById("color");
const rectModeBtn = document.getElementById("rectMode");
const circleModeBtn = document.getElementById("circleMode");
const penModeBtn = document.getElementById("penMode");
const ctx = canvas.getContext("2d");

let size = 5;
let drawing = false;
let x, y;
let color = colorElement.value;
let mode = null;
let textMode = false;

penModeBtn.addEventListener("click", () => {
  mode = null;
  updateSelection();
});

canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
  x = undefined;
  y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;

  const x2 = e.offsetX;
  const y2 = e.offsetY;

  if (mode === null) {
    ctx.strokeStyle = color;
    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);
    x = x2;
    y = y2;
  } else if (mode === "rectMode") {
    const width = x2 - x;
    const height = y2 - y;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.strokeRect(x, y, width, height);
  } else if (mode === "circleMode") {
    const radius = Math.sqrt(Math.pow(x2 - x, 2) + Math.pow(y2 - y, 2));
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.stroke();
  }
});

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
}

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function updateSizeOnScreen() {
  sizeElement.innerText = size;
}

increaseBtn.addEventListener("click", () => {
  size = Math.min(size + 5, 50);
  updateSizeOnScreen();
});

decreaseBtn.addEventListener("click", () => {
  size = Math.max(size - 5, 5);
  updateSizeOnScreen();
});

rectModeBtn.addEventListener("click", () => {
  mode = "rectMode";
  textMode = false;
  updateSelection();
});

circleModeBtn.addEventListener("click", () => {
  mode = "circleMode";
  textMode = false;
  updateSelection();
});

function updateSelection() {
  rectModeBtn.classList.remove("selected");
  circleModeBtn.classList.remove("selected");
  penModeBtn.classList.remove("selected");

  if (mode === "rectMode") {
    rectModeBtn.classList.add("selected");
  } else if (mode === "circleMode") {
    circleModeBtn.classList.add("selected");
  } else if (textMode) {
    penModeBtn.classList.add("selected");
  }
}

colorElement.addEventListener("input", (e) => {
  console.log("Renk değişti: ", e.target.value);
  color = e.target.value;
});

clearBtn.addEventListener("click", () => {
  mode = null;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
