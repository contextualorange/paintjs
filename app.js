const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const lineWidth = document.getElementById('lineWidth');
const modeBtn = document.getElementById('mode');
const saveBtn = document.getElementById('save');

const INITIAL_COLOR = '#2c2c2c';
const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 500;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorChange(event) {
  const color = event.target.value;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleLineWidth(event) {
  ctx.lineWidth = event.target.value;
}

function handleModeClick() {
  if (filling) {
    filling = false;
    modeBtn.innerText = 'Fill';
  } else {
    filling = true;
    modeBtn.innerText = 'Paint';
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = image;
  link.download = 'PaintJS.png';
  link.click();
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', handleCanvasClick);
  canvas.addEventListener('contextmenu', handleCM);
}

if (colorPicker) {
  colorPicker.addEventListener('change', handleColorChange);
}

if (lineWidth) {
  lineWidth.addEventListener('input', handleLineWidth);
}

if (modeBtn) {
  modeBtn.addEventListener('click', handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener('click', handleSaveClick);
}
