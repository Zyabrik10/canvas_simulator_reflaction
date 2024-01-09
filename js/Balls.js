import { canvas, ctx, worldSettings } from "./config.js";
import { cos, pi, randInt, sin } from "./math.js";

export default class Ball {
  constructor({ coor, color, rad }) {
    this.rad = rad || randInt(worldSettings.minRad, worldSettings.maxRad);
    this.mass = this.rad * worldSettings.massKof;
    this.coor = coor || {
      x: randInt(this.rad, canvas.width - this.rad),
      y: -this.rad,
    };

    const dist = canvas.height - worldSettings.floorY - this.coor.y;

    this.coorReflaction = {
      x: this.coor.x,
      y: canvas.height - worldSettings.floorY + dist,
    };
    this.colorNumber = randInt(worldSettings.minHsl, worldSettings.maxHsl);
    this.color = color || `hsl(${this.colorNumber}, 80%, 50%)`;
    this.colorReflaction = `hsl(${this.colorNumber}, 80%, 50%)`;

    this.vel = {
      x:
        cos(randInt(0, 2 * pi)) *
        randInt(worldSettings.minVeloctiy, worldSettings.maxVeloctiy),
      y:
        sin(randInt(0, 2 * pi)) *
        randInt(worldSettings.minVeloctiy, worldSettings.maxVeloctiy),
    };
  }

  draw() {
    const { x, y } = this.coor;

    ctx.fillStyle = this.color;
    ctx.filter = "blur(0)";
    ctx.beginPath();
    ctx.arc(x, y, this.rad, 0, 2 * pi);
    ctx.fill();

    if (y + this.rad >= 0) this.drawReflaction();
  }

  drawReflaction() {
    const { x, y } = this.coorReflaction;

    ctx.save();
    ctx.fillStyle = this.colorReflaction;

    let dist = canvas.height - worldSettings.floorY - (this.coor.y + this.rad);
    let trans = 1 - dist / (canvas.height - worldSettings.floorY);

    if (trans === 0) return;

    ctx.filter = `blur(${
      (dist / (canvas.height - worldSettings.floorY)) * worldSettings.startBlur
    }px)`;
    this.colorReflaction = `hsla(${this.colorNumber}, 80%, ${
      trans * worldSettings.reflectionDarkness
    }%, 1)`;

    let radX = this.rad * trans * worldSettings.elipseDeformationX;
    let radY = this.rad * worldSettings.elipseDeformationY;

    if (radX < 0) radX = 0;

    ctx.beginPath();
    ctx.ellipse(x, y, radX, radY, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  move() {
    this.vel.y += worldSettings.gravity * this.mass;
    this.coor.y += this.vel.y;
    this.coor.x += this.vel.x;

    if (this.coor.y + this.rad >= canvas.height - worldSettings.floorY) {
      this.vel.y *= -1 * worldSettings.forceOfReflection;
      this.coor.y = canvas.height - worldSettings.floorY - this.rad;
      this.vel.x *= worldSettings.frictionForce;
    }

    if (this.coor.x + this.rad >= canvas.width) {
      this.vel.x *= -1 * worldSettings.frictionForce;
      this.coor.x = canvas.width - this.rad;
    } else if (this.coor.x - this.rad <= 0) {
      this.vel.x *= -1 * worldSettings.frictionForce;
      this.coor.x = this.rad;
    }
  }

  update() {
    this.move();
    this.draw();

    this.coorReflaction.x = this.coor.x;
    const dist2 = canvas.height - worldSettings.floorY - this.coor.y;
    this.coorReflaction.y = canvas.height - worldSettings.floorY + dist2;
  }
}
