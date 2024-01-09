export const canvas = document.querySelector("canvas");
export const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const settings = new dat.GUI();

export const worldSettings = {
  gravity: 0.7,
  forceOfReflection: 0.5,
  massKof: 0.02,
  minRad: 10,
  maxRad: 30,
  numbers: 20,
  reflectionDarkness: 25,
  elipseDeformationX: 1.1,
  elipseDeformationY: 1,
  startBlur: 10,
  frictionForce: 0.7,
  floorY: canvas.height / 2,
  minVeloctiy: 1,
  maxVeloctiy: 5,
  minHsl: 0,
  maxHsl: 100,
};

settings.add(worldSettings, "gravity", 0.1, 1);
settings.add(worldSettings, "frictionForce", 0, 1);
settings.add(worldSettings, "forceOfReflection", 0, 1);
settings.add(worldSettings, "massKof", 0.01, 0.1).step(0.001);
settings.add(worldSettings, "minRad", 1, 50);
settings.add(worldSettings, "maxRad", 1, 50);
settings.add(worldSettings, "numbers", 1, 50);
settings.add(worldSettings, "reflectionDarkness", 5, 50);
settings.add(worldSettings, "startBlur", 0, 10);
settings.add(worldSettings, "floorY", 0, canvas.height);
settings.add(worldSettings, "minVeloctiy", 1, 100);
settings.add(worldSettings, "maxVeloctiy", 1, 100);
settings.add(worldSettings, "minHsl", 0, 360);
settings.add(worldSettings, "maxHsl", 0, 360);
