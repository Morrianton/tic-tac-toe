import Player from "../models/Player.mjs";
import Tile from "../models/Tile.mjs";

function loadControls() {
  return {
    playButton: document.getElementById("playButton"),
  };
}

function loadTiles() {
  const TABLE_SIZE = 9;
  const tiles = new Array();

  for (let i = 0; i < TABLE_SIZE; i++) {
    tiles.push(new Tile(i + 1, document.getElementById(`tile${i + 1}`)));
  }
  return tiles;
}

function loadPlayers() {
  return new Array(new Player(1, 'x'), new Player(2, 'o'));
}

export default function loadElements() {
  return {
    controls: loadControls(),
    players: loadPlayers(),
    tiles: loadTiles(),
  }
}
