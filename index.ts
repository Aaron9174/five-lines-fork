
const TILE_SIZE = 30;
const FPS = 30;
const SLEEP = 1000 / FPS;

enum RawTile {
  AIR,
  FLUX,
  UNBREAKABLE,
  PLAYER,
  STONE, FALLING_STONE,
  BOX, FALLING_BOX,
  KEY1, LOCK1,
  KEY2, LOCK2,
}

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
  draw(g: CanvasRenderingContext2D, y: number, x: number): void;
  isEdible(): boolean;
  isPushable(): boolean;
  moveHorizontal(dx: number): void;
  moveVertical(dy: number): void;
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
  draw(g: CanvasRenderingContext2D, y: number, x: number): void {}
  isEdible(): boolean { return true; }
  isPushable(): boolean { return false; }
  moveHorizontal(dx: number): void {
    moveToTile(playerx + dx, playery);
  }
  moveVertical(dy: number): void {
    moveToTile(playerx, playery + dy);
  }
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
  draw(g: CanvasRenderingContext2D, y: number, x: number): void {
    g.fillStyle = "#ccffcc";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible(): boolean { return true; }
  isPushable(): boolean { return false; }
  moveHorizontal(dx: number): void {
    moveToTile(playerx + dx, playery);
  }
  moveVertical(dy: number): void {
    moveToTile(playerx, playery + dy);
  }
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
  draw(g: CanvasRenderingContext2D, y: number, x: number): void {
    g.fillStyle = "#999999";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible(): boolean { return false; }
  isPushable(): boolean { return false; }
  moveHorizontal(dx: number): void {}
  moveVertical(dy: number): void {}
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
  draw(g: CanvasRenderingContext2D, y: number, x: number): void {}
  isEdible(): boolean { return false; }
  isPushable(): boolean { return false; }
  moveHorizontal(dx: number): void {}
  moveVertical(dy: number): void {}
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
  draw(g: CanvasRenderingContext2D, y: number, x: number): void {
    g.fillStyle = "#0000cc";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible(): boolean { return false; }
  isPushable(): boolean { return true; }
  moveHorizontal(dx: number): void {
    if (map[playery][playerx + dx + dx].isAir()
    && !map[playery + 1][playerx + dx].isAir()) {
      moveToTile(playerx + dx, playery);
    }
  }
  moveVertical(dy: number): void {}
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
  draw(g: CanvasRenderingContext2D, y: number, x: number): void {
    g.fillStyle = "#0000cc";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible(): boolean { return false; }
  isPushable(): boolean { return false; }
  moveHorizontal(dx: number): void {}
  moveVertical(dy: number): void {}
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
  draw(g: CanvasRenderingContext2D, y: number, x: number): void {
    g.fillStyle = "#8b4513";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible(): boolean { return false; }
  isPushable(): boolean { return true; }
  moveHorizontal(dx: number): void {
    if (map[playery][playerx + dx + dx].isAir()
    && !map[playery + 1][playerx + dx].isAir()) {
      map[playery][playerx + dx +dx] = map[playery][playerx + dx];
      moveToTile(playerx + dx, playery);
    }
  }
  moveVertical(dy: number): void {}
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
  draw(g: CanvasRenderingContext2D, y: number, x: number): void {
    g.fillStyle = "#8b4513";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible(): boolean { return false; }
  isPushable(): boolean { return false; }
  moveHorizontal(dx: number): void {}
  moveVertical(dy: number): void {}
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
  draw(g: CanvasRenderingContext2D, y: number, x: number): void {
    g.fillStyle = "#ffcc00";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible(): boolean { return false; }
  isPushable(): boolean { return false; }
  moveHorizontal(dx: number): void {
    removeLock1();
    moveToTile(playerx + dx, playery);
  }
  moveVertical(dy: number): void {
    removeLock1();
    moveToTile(playerx, playery + dy);
  }
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
  draw(g: CanvasRenderingContext2D, y: number, x: number): void {
    g.fillStyle = "#ffcc00";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible(): boolean { return false; }
  isPushable(): boolean { return false; }
  moveHorizontal(dx: number): void {}
  moveVertical(dy: number): void {}
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
  draw(g: CanvasRenderingContext2D, y: number, x: number): void {
    g.fillStyle = "#00ccff";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible(): boolean { return false; }
  isPushable(): boolean { return false; }
  moveHorizontal(dx: number): void {
    removeLock2();
    moveToTile(playerx + dx, playery);
  }
  moveVertical(dy: number): void {
    removeLock2();
    moveToTile(playerx, playery + dy);
  }
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
  draw(g: CanvasRenderingContext2D, y: number, x: number): void {
    g.fillStyle = "#00ccff";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible(): boolean { return false; }
  isPushable(): boolean { return false; }
  moveHorizontal(dx: number): void {}
  moveVertical(dy: number): void {}
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
let rawMap: RawTile[][] = [
  [2, 2, 2, 2, 2, 2, 2, 2],
  [2, 3, 0, 1, 1, 2, 0, 2],
  [2, 4, 2, 6, 1, 2, 0, 2],
  [2, 8, 4, 1, 1, 2, 0, 2],
  [2, 4, 1, 1, 1, 9, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2],
];
let map: Tile[][];

function assertExhausted(x: never): never {
  throw new Error("Unexpected object: " + x);
}

function transformTile(tile: RawTile): Tile {
  switch (tile) {
    case RawTile.AIR:
      return new Air();
    case RawTile.FLUX:
      return new Flux();
    case RawTile.UNBREAKABLE:
      return new Unbreakable();
    case RawTile.PLAYER:
      return new Player();
    case RawTile.STONE:
      return new Stone();
    case RawTile.FALLING_STONE:
      return new FallingStone();
    case RawTile.BOX:
      return new Box();
    case RawTile.FALLING_BOX:
      return new FallingBox();
    case RawTile.KEY1:
      return new Key1();
    case RawTile.LOCK1:
      return new Lock1();
    case RawTile.KEY2:
      return new Key2();
    case RawTile.LOCK2:
      return new Lock2();
    default:
      assertExhausted(tile);
  }
}

function transformMap(): void {
  map = new Array(rawMap.length);

  for (let y = 0; y < rawMap.length; y++) {
    map[y] = new Array(rawMap[y].length);
    for (let x = 0; x < rawMap[y].length; x++) {
      map[y][x] = transformTile(rawMap[y][x]);
    } 
  }
}

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
  map[playery][playerx + dx].moveHorizontal(dx);
}

function moveVertical(dy: number) {
  map[playery +dy][playerx].moveVertical(dy);
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
      map[y][x].draw(canvasContext, y, x);
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
  transformMap();
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

