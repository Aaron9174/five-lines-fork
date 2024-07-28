
const TILE_SIZE = 30;
const FPS = 30;
const SLEEP = 1000 / FPS;

enum Tile {
  AIR,
  FLUX,
  UNBREAKABLE,
  PLAYER,
  STONE, FALLING_STONE,
  BOX, FALLING_BOX,
  KEY1, LOCK1,
  KEY2, LOCK2
}

enum RawInput {
  UP, DOWN, LEFT, RIGHT
}

interface Input {
    isRight(): boolean;
    isLeft(): boolean;
    isUp(): boolean;
    isDown(): boolean;
}

class Right implements Input {
  isRight() { return true; }
  isLeft() { return false; }
  isUp() { return false; }
  isDown() { return false; }
}

class Left implements Input {
  isRight() { return false; }
  isLeft() { return true; }
  isUp() { return false; }
  isDown() { return false; }
}

class Up implements Input {
  isRight() { return false; }
  isLeft() { return false; }
  isUp() { return true; }
  isDown() { return false; }
}

class Down implements Input {
  isRight() { return false; }
  isLeft() { return false; }
  isUp() { return false; }
  isDown() { return true; }
}

let playerx = 1;
let playery = 1;
let map: Tile[][] = [
  [2, 2, 2, 2, 2, 2, 2, 2],
  [2, 3, 0, 1, 1, 2, 0, 2],
  [2, 4, 2, 6, 1, 2, 0, 2],
  [2, 8, 4, 1, 1, 2, 0, 2],
  [2, 4, 1, 1, 1, 9, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2],
];

let inputs: Input[] = [];

function remove(tile: Tile) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === tile) {
        map[y][x] = Tile.AIR;
      }
    }
  }
}

function moveToTile(newx: number, newy: number) {
  map[playery][playerx] = Tile.AIR;
  map[newy][newx] = Tile.PLAYER;
  playerx = newx;
  playery = newy;
}

function moveHorizontal(dx: number) {
  if (map[playery][playerx + dx] === Tile.FLUX
    || map[playery][playerx + dx] === Tile.AIR) {
    moveToTile(playerx + dx, playery);
  } else if ((map[playery][playerx + dx] === Tile.STONE
    || map[playery][playerx + dx] === Tile.BOX)
    && map[playery][playerx + dx + dx] === Tile.AIR
    && map[playery + 1][playerx + dx] !== Tile.AIR) {
    map[playery][playerx + dx + dx] = map[playery][playerx + dx];
    moveToTile(playerx + dx, playery);
  } else if (map[playery][playerx + dx] === Tile.KEY1) {
    remove(Tile.LOCK1);
    moveToTile(playerx + dx, playery);
  } else if (map[playery][playerx + dx] === Tile.KEY2) {
    remove(Tile.LOCK2);
    moveToTile(playerx + dx, playery);
  }
}

function moveVertical(dy: number) {
  if (map[playery + dy][playerx] === Tile.FLUX
    || map[playery + dy][playerx] === Tile.AIR) {
    moveToTile(playerx, playery + dy);
  } else if (map[playery + dy][playerx] === Tile.KEY1) {
    remove(Tile.LOCK1);
    moveToTile(playerx, playery + dy);
  } else if (map[playery + dy][playerx] === Tile.KEY2) {
    remove(Tile.LOCK2);
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
    performMove(current);
  }
}

function performMove(current: Input) {
    if (current.isLeft())
      moveHorizontal(-1);
    else if (current.isRight())
      moveHorizontal(1);
    else if (current.isUp())
      moveVertical(-1);
    else if (current.isDown())
      moveVertical(1);
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
    map[y + 1][x] = Tile.FALLING_STONE;
    map[y][x] = Tile.AIR;
  } else if (isFallingBox(y, x)) {
    map[y + 1][x] = Tile.FALLING_BOX;
    map[y][x] = Tile.AIR;
  } else if (isStationaryStone(y, x)) {
    map[y][x] = Tile.STONE;
  } else if (isStationaryBox(y, x)) {
    map[y][x] = Tile.BOX;
  }
}

function isFallingStone(y: number, x: number): boolean {
  return (map[y][x] === Tile.STONE || map[y][x] === Tile.FALLING_STONE)
      && map[y + 1][x] === Tile.AIR;
}

function isFallingBox(y: number, x: number): boolean {
  return (map[y][x] === Tile.BOX || map[y][x] === Tile.FALLING_BOX) && map[y + 1][x] === Tile.AIR;
}

function isStationaryStone(y: number, x: number): boolean {
  return (map[y][x] === Tile.FALLING_STONE || map[y][x] === Tile.STONE) && map[y + 1][x] !== Tile.AIR;
}

function isStationaryBox(y: number, x: number): boolean {
  return (map[y][x] === Tile.FALLING_BOX || map[y][x] === Tile.BOX) && map[y + 1][x] !== Tile.AIR;
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
      if (map[y][x] === Tile.FLUX)
        canvasContext.fillStyle = "#ccffcc";
      else if (map[y][x] === Tile.UNBREAKABLE)
        canvasContext.fillStyle = "#999999";
      else if (map[y][x] === Tile.STONE || map[y][x] === Tile.FALLING_STONE)
        canvasContext.fillStyle = "#0000cc";
      else if (map[y][x] === Tile.BOX || map[y][x] === Tile.FALLING_BOX)
        canvasContext.fillStyle = "#8b4513";
      else if (map[y][x] === Tile.KEY1 || map[y][x] === Tile.LOCK1)
        canvasContext.fillStyle = "#ffcc00";
      else if (map[y][x] === Tile.KEY2 || map[y][x] === Tile.LOCK2)
        canvasContext.fillStyle = "#00ccff";

      if (map[y][x] !== Tile.AIR && map[y][x] !== Tile.PLAYER)
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

