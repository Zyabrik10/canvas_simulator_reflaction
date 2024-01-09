import { canvas, ctx, worldSettings } from "./config.js";
import Ball from "./Balls.js";

let balls = [];

let mdown = false;
let vectorExist = false;

let mouse = {
  x: undefined,
  y: undefined,
};
let initObject;
let point1 = {
  x: undefined,
  y: undefined,
};
let point2 = {
  x: undefined,
  y: undefined,
};

function spawn() {
  for (let i = 0; i < worldSettings.numbers; i++) {
    balls.push(new Ball({}));
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  balls.forEach((e) => e.update());

  if (mdown) {
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();

    initObject.draw();
    initObject.drawReflaction();
  }

  if (mdown && vectorExist) {
    balls.push(initObject);
    vectorExist = false;
    mouse.x = undefined;
    mouse.y = undefined;
  }

  requestAnimationFrame(update);
}

spawn();
update();

const spawnButton = document.querySelector(".spawn");
const clearButton = document.querySelector(".clear");

spawnButton.addEventListener("click", () => {
  spawn();
});

clearButton.addEventListener("click", () => {
  balls = [];
});

canvas.addEventListener("touchstart", ({ offsetX: x, offsetY: y }) => {
  point1.x = x;
  point1.y = y;

  if (y >= worldSettings.floorY) {
    const diff = point1.y - worldSettings.floorY;

    point1.y = worldSettings.floorY - diff;
  }

  initObject = new Ball({
    coor: {
      x: point1.x,
      y: point1.y,
    },
  });

  mdown = true;
  vectorExist = false;
});

canvas.addEventListener("mousemove", ({ offsetX: x, offsetY: y }) => {
  mouse.x = x;
  mouse.y = y;
});

canvas.addEventListener("touchmove", ({ offsetX: x, offsetY: y }) => {
  mouse.x = x;
  mouse.y = y;
});

canvas.addEventListener("touchend", ({ offsetX: x, offsetY: y }) => {
  point2.x = x;
  point2.y = y;

  initObject.vel.x = (point2.x - point1.x) * 0.1;
  initObject.vel.y = (point2.y - point1.y) * 0.1;

  vectorExist = true;
  mdown = false;

  balls.push(initObject);
});

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});
