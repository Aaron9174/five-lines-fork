
const TILE_SIZE = 30;
const FPS = 30;
const SLEEP = 1000 / FPS;

interface Tile {
  isAir(): boolean;
  isFlux(): boolean;
  isUnbreakable(): boolean;
  isPlayer(): boolean;
  isStone(): boolean;
  isFallingStone(): boolean;
  isBox(): boolean;
  isFallingBox(): boolean;
  isKey1(): boolean;
  isLock1(): boolean;
  isKey2(): boolean;
  isLock2(): boolean;
}

class Air implements Tile {
  isAir(): boolean { return true; }
  isFlux(): boolean { return false; }
  isUnbreakable(): boolean { return false; }
  isPlayer(): boolean { return false; }
  isStone(): boolean { return false; }
  isFallingStone(): boolean { return false; }
  isBox(): boolean { return false; }
  isFallingBox(): boolean { return false; }
  isKey1(): boolean { return false; }
  isLock1(): boolean { return false; }
  isKey2(): boolean { return false; }
  isLock2(): boolean { return false; }
}

class Flux implements Tile {
  isAir(): boolean { return false; }
  isFlux(): boolean { return true; }
  isUnbreakable(): boolean { return false; }
  isPlayer(): boolean { return false; }
  isStone(): boolean { return false; }
  isFallingStone(): boolean { return false; }
  isBox(): boolean { return false; }
  isFallingBox(): boolean { return false; }
  isKey1(): boolean { return false; }
  isLock1(): boolean { return false; }
  isKey2(): boolean { return false; }
  isLock2(): boolean { return false; }
}

class Unbreakable implements Tile {
  isAir(): boolean { return false; }
  isFlux(): boolean { return false; }
  isUnbreakable(): boolean { return true; }
  isPlayer(): boolean { return false; }
  isStone(): boolean { return false; }
  isFallingStone(): boolean { return false; }
  isBox(): boolean { return false; }
  isFallingBox(): boolean { return false; }
  isKey1(): boolean { return false; }
  isLock1(): boolean { return false; }
  isKey2(): boolean { return false; }
  isLock2(): boolean { return false; }
}

class Player implements Tile {
  isAir(): boolean { return false; }
  isFlux(): boolean { return false; }
  isUnbreakable(): boolean { return false; }
  isPlayer(): boolean { return true; }
  isStone(): boolean { return false; }
  isFallingStone(): boolean { return false; }
  isBox(): boolean { return false; }
  isFallingBox(): boolean { return false; }
  isKey1(): boolean { return false; }
  isLock1(): boolean { return false; }
  isKey2(): boolean { return false; }
  isLock2(): boolean { return false; }
}

class Stone implements Tile {
  isAir(): boolean { return false; }
  isFlux(): boolean { return false; }
  isUnbreakable(): boolean { return false; }
  isPlayer(): boolean { return false; }
  isStone(): boolean { return true; }
  isFallingStone(): boolean { return false; }
  isBox(): boolean { return false; }
  isFallingBox(): boolean { return false; }
  isKey1(): boolean { return false; }
  isLock1(): boolean { return false; }
  isKey2(): boolean { return false; }
  isLock2(): boolean { return false; }
}

class FallingStone implements Tile {
  isAir(): boolean { return false; }
  isFlux(): boolean { return false; }
  isUnbreakable(): boolean { return false; }
  isPlayer(): boolean { return false; }
  isStone(): boolean { return false; }
  isFallingStone(): boolean { return true; }
  isBox(): boolean { return false; }
  isFallingBox(): boolean { return false; }
  isKey1(): boolean { return false; }
  isLock1(): boolean { return false; }
  isKey2(): boolean { return false; }
  isLock2(): boolean { return false; }
}

class Box implements Tile {
  isAir(): boolean { return false; }
  isFlux(): boolean { return false; }
  isUnbreakable(): boolean { return false; }
  isPlayer(): boolean { return false; }
  isStone(): boolean { return false; }
  isFallingStone(): boolean { return false; }
  isBox(): boolean { return true; }
  isFallingBox(): boolean { return false; }
  isKey1(): boolean { return false; }
  isLock1(): boolean { return false; }
  isKey2(): boolean { return false; }
  isLock2(): boolean { return false; }
}

class FallingBox implements Tile {
  isAir(): boolean { return false; }
  isFlux(): boolean { return false; }
  isUnbreakable(): boolean { return false; }
  isPlayer(): boolean { return false; }
  isStone(): boolean { return false; }
  isFallingStone(): boolean { return false; }
  isBox(): boolean { return false; }
  isFallingBox(): boolean { return true; }
  isKey1(): boolean { return false; }
  isLock1(): boolean { return false; }
  isKey2(): boolean { return false; }
  isLock2(): boolean { return false; }
}

class Key1 implements Tile {
  isAir(): boolean { return false; }
  isFlux(): boolean { return false; }
  isUnbreakable(): boolean { return false; }
  isPlayer(): boolean { return false; }
  isStone(): boolean { return false; }
  isFallingStone(): boolean { return false; }
  isBox(): boolean { return false; }
  isFallingBox(): boolean { return false; }
  isKey1(): boolean { return true; }
  isLock1(): boolean { return false; }
  isKey2(): boolean { return false; }
  isLock2(): boolean { return false; }
}

class Lock1 implements Tile {
  isAir(): boolean { return false; }
  isFlux(): boolean { return false; }
  isUnbreakable(): boolean { return false; }
  isPlayer(): boolean { return false; }
  isStone(): boolean { return false; }
  isFallingStone(): boolean { return false; }
  isBox(): boolean { return false; }
  isFallingBox(): boolean { return false; }
  isKey1(): boolean { return false; }
  isLock1(): boolean { return true; }
  isKey2(): boolean { return false; }
  isLock2(): boolean { return false; }
}

class Key2 implements Tile {
  isAir(): boolean { return false; }
  isFlux(): boolean { return false; }
  isUnbreakable(): boolean { return false; }
  isPlayer(): boolean { return false; }
  isStone(): boolean { return false; }
  isFallingStone(): boolean { return false; }
  isBox(): boolean { return false; }
  isFallingBox(): boolean { return false; }
  isKey1(): boolean { return false; }
  isLock1(): boolean { return false; }
  isKey2(): boolean { return true; }
  isLock2(): boolean { return false; }
}

class Lock2 implements Tile {
  isAir(): boolean { return false; }
  isFlux(): boolean { return false; }
  isUnbreakable(): boolean { return false; }
  isPlayer(): boolean { return false; }
  isStone(): boolean { return false; }
  isFallingStone(): boolean { return false; }
  isBox(): boolean { return false; }
  isFallingBox(): boolean { return false; }
  isKey1(): boolean { return false; }
  isLock1(): boolean { return false; }
  isKey2(): boolean { return false; }
  isLock2(): boolean { return true; }
}

enum RawInput {
  UP, DOWN, LEFT, RIGHT
}

interface Input {
    isRight(): boolean;
    isLeft(): boolean;
    isUp(): boolean;
    isDown(): boolean;

    handle(): void;
}

class Right implements Input {
  isRight() { return true; }
  isLeft() { return false; }
  isUp() { return false; }
  isDown() { return false; }

  handle(): void {
    moveHorizontal(1);
  }
}

class Left implements Input {
  isRight() { return false; }
  isLeft() { return true; }
  isUp() { return false; }
  isDown() { return false; }

  handle(): void {
    moveHorizontal(-1);
  }
}

class Up implements Input {
  isRight() { return false; }
  isLeft() { return false; }
  isUp() { return true; }
  isDown() { return false; }

  handle(): void {
    moveVertical(-1);
  }
}

class Down implements Input {
  isRight() { return false; }
  isLeft() { return false; }
  isUp() { return false; }
  isDown() { return true; }

  handle(): void {
    moveVertical(1);
  }
}

let playerx = 1;
let playery = 1;
let map: Tile[][] = [
  [new Unbreakable(), new Unbreakable(), new Unbreakable(), new Unbreakable(), new Unbreakable(), new Unbreakable(), new Unbreakable(), new Unbreakable()],
  [new Unbreakable(), new Player(), new Air(), new Flux(), new Flux(), new Unbreakable(), new Air(), new Unbreakable()],
  [new Unbreakable(), new Stone(), new Unbreakable(), new Box(), new Flux(), new Unbreakable(), new Air(), new Unbreakable()],
  [new Unbreakable(), new Key1(), new Stone(), new Flux(), new Flux(), new Unbreakable(), new Air(), new Unbreakable()],
  [new Unbreakable(), new Stone(), new Flux(), new Flux(), new Flux(), new Lock1(), new Air(), new Unbreakable()],
  [new Unbreakable(), new Unbreakable(), new Unbreakable(), new Unbreakable(), new Unbreakable(), new Unbreakable(), new Unbreakable(), new Unbreakable()],
];

let inputs: Input[] = [];

function removeLock1(): void {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x].isLock1()) {
        map[y][x] = new Air();
      }
    }
  }
}

function removeLock2(): void {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x].isLock2()) {
        map[y][x] = new Air();
      }
    }
  }
}

function moveToTile(newx: number, newy: number) {
  map[playery][playerx] = new Air();
  map[newy][newx] = new Player();
  playerx = newx;
  playery = newy;
}

function moveHorizontal(dx: number) {
  if (map[playery][playerx + dx].isFlux()
    || map[playery][playerx + dx].isAir()) {
    moveToTile(playerx + dx, playery);
  } else if ((map[playery][playerx + dx].isStone()
    || map[playery][playerx + dx].isBox())
    && map[playery][playerx + dx + dx].isAir()
    && !map[playery + 1][playerx + dx].isAir()) {
    map[playery][playerx + dx + dx] = map[playery][playerx + dx];
    moveToTile(playerx + dx, playery);
  } else if (map[playery][playerx + dx].isKey1()) {
    removeLock1();
    moveToTile(playerx + dx, playery);
  } else if (map[playery][playerx + dx].isKey2()) {
    removeLock2();
    moveToTile(playerx + dx, playery);
  }
}

function moveVertical(dy: number) {
  if (map[playery + dy][playerx].isFlux()
    || map[playery + dy][playerx].isAir()) {
    moveToTile(playerx, playery + dy);
  } else if (map[playery + dy][playerx].isKey1()) {
    removeLock1();
    moveToTile(playerx, playery + dy);
  } else if (map[playery + dy][playerx].isKey2()) {
    removeLock2();
    moveToTile(playerx, playery + dy);
  }
}

function update() {
  processInputs();
  updateMap();
}

function processInputs() {
  while (inputs.length > 0) {
    let current: Input = inputs.pop();
    current.handle();
  }
}

function handleInput2(current: Input) {
  current.handle();
}

function updateMap() {
  for (let y = map.length - 1; y >= 0; y--) {
    for (let x = 0; x < map[y].length; x++) {
      updateBlock(y, x);
    }
  }
}

function updateBlock(y: number, x: number): void {
  if (isFallingStone(y, x)) {
    map[y + 1][x] = new FallingStone();
    map[y][x] = new Air();
  } else if (isFallingBox(y, x)) {
    map[y + 1][x] = new FallingBox();
    map[y][x] = new Air();
  } else if (isStationaryStone(y, x)) {
    map[y][x] = new Stone();
  } else if (isStationaryBox(y, x)) {
    map[y][x] = new Box();
  }
}

function isFallingStone(y: number, x: number): boolean {
  return (map[y][x].isStone() || map[y][x].isFallingStone())
      && map[y + 1][x].isAir();
}

function isFallingBox(y: number, x: number): boolean {
  return (map[y][x].isBox() || map[y][x].isFallingBox()) && map[y + 1][x].isAir();
}

function isStationaryStone(y: number, x: number): boolean {
  return (map[y][x].isFallingStone() || map[y][x].isStone()) && !map[y + 1][x].isAir();
}

function isStationaryBox(y: number, x: number): boolean {
  return (map[y][x].isFallingBox() || map[y][x].isBox()) && !map[y + 1][x].isAir();
}

function createGraphics(): CanvasRenderingContext2D {
  let canvas = <HTMLCanvasElement>document.getElementById("GameCanvas");
  let canvasContext: CanvasRenderingContext2D = canvas.getContext("2d");
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  return canvasContext;
}

/**
 * Refreshs and draws the canvas
 */
function draw() {
  let canvasContext: CanvasRenderingContext2D = createGraphics();
  drawMap(canvasContext);
  drawPlayer(canvasContext);
}

/**
 * Draws the map
 * @param canvasContext - The canvas to update
 */
function drawMap(canvasContext: CanvasRenderingContext2D) {

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x].isFlux())
        canvasContext.fillStyle = "#ccffcc";
      else if (map[y][x].isUnbreakable())
        canvasContext.fillStyle = "#999999";
      else if (map[y][x].isStone() || map[y][x].isFallingStone())
        canvasContext.fillStyle = "#0000cc";
      else if (map[y][x].isBox() || map[y][x].isFallingBox())
        canvasContext.fillStyle = "#8b4513";
      else if (map[y][x].isKey1() || map[y][x].isLock1())
        canvasContext.fillStyle = "#ffcc00";
      else if (map[y][x].isKey2() || map[y][x].isLock2())
        canvasContext.fillStyle = "#00ccff";

      if (!map[y][x].isAir() && !map[y][x].isPlayer())
        canvasContext.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
  }
}

/**
 * Draws the player
 * @param canvasContext - The canvas to update
 */
function drawPlayer(canvasContext: CanvasRenderingContext2D) {
  canvasContext.fillStyle = "#ff0000";
  canvasContext.fillRect(playerx * TILE_SIZE, playery * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function gameLoop() {
  let before = Date.now();
  update();
  draw();
  let after = Date.now();
  let frameTime = after - before;
  let sleep = SLEEP - frameTime;
  setTimeout(() => gameLoop(), sleep);
}

window.onload = () => {
  gameLoop();
}

const LEFT_KEY = "ArrowLeft";
const UP_KEY = "ArrowUp";
const RIGHT_KEY = "ArrowRight";
const DOWN_KEY = "ArrowDown";
window.addEventListener("keydown", e => {
  if (e.key === LEFT_KEY || e.key === "a") inputs.push(new Left());
  else if (e.key === UP_KEY || e.key === "w") inputs.push(new Up());
  else if (e.key === RIGHT_KEY || e.key === "d") inputs.push(new Right());
  else if (e.key === DOWN_KEY || e.key === "s") inputs.push(new Down());
});

