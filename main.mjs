import loadElements from "./lib/init.mjs";
import { WINNING_COMBOS } from "./constants/winningPlays.mjs";
import { containsSameThree } from "./lib/utils.mjs";

const elements = loadElements();
const controls = elements.controls;
const players = elements.players;
const tiles = elements.tiles;
const message = document.getElementById("message");

let activeTiles = new Array(...tiles);
let activePlayer = players[0];
let hasFinished = false;
let hasStarted = false;
let inactivePlayer = players[1]
let outerTimeout;
let innerTimeout;

controls.playButton.addEventListener('click', resetPlay);
tiles.forEach(({ element }) => {
  element.addEventListener('click', makePlay);
});

function resetPlay() {
  if (!hasFinished) {
    resetGame();
  } else {
    playAgain();
  }
}

function resetGame() {
  clearTimeout(innerTimeout);
  clearTimeout(outerTimeout);

  if (!controls.playButton.hidden) {
    controls.playButton.hidden = true;
  }

  hasFinished = false;
  resetBoard();
  resetTileClaims();
  message.innerHTML = 'Game has been reset.'
  
  outerTimeout = setTimeout(() => {
    message.innerHTML = `Player ${activePlayer.id}'s turn.`;
    innerTimeout = setTimeout(() => {
      message.innerHTML = '';
    }, 1500);
  }, 1500);
}

function previewPlay(tile) {
  tile.element.innerHTML = activePlayer.symbol;
}

function removePreview(tile) {
  tile.element.innerHTML = '';
}

function playAgain() {
  hasFinished = false;
  controls.playButton.hidden = true;
  message.innerHTML = '';
  resetBoard();
  resetTileClaims();
  swapPlayers();

  setTimeout(() => {
    message.innerHTML = `Player ${activePlayer.id}'s turn.`;
    setTimeout(() => {
      message.innerHTML = '';
    }, 1500);
  }, 1500);
}

function makePlay() {
  clearTimeout(outerTimeout);
  
  const tileNumber = this.getAttribute("tilenumber");
  const subjectTile = activeTiles.find(tile => tile.id === Number(tileNumber));

  
  if (subjectTile.isActive) {
    this.innerHTML = activePlayer.symbol;
    processTile(tileNumber);

    if (controls.playButton.hidden && activeTiles.length < 9) {
      hasStarted = true;
      controls.playButton.innerHTML = 'Reset';
      controls.playButton.hidden = false;
    }

    checkForWinner();
  } else {
    message.innerHTML = 'A play has already been made on this tile.'
    outerTimeout = setTimeout(() => {
      message.innerHTML = '';
    }, 3000);
  }
}

function swapPlayers() {
  const placeholder = activePlayer;
  activePlayer = inactivePlayer;
  inactivePlayer = placeholder;
}

function checkForWinner() {
  if (containsSameThree(activePlayer.claimedTiles, WINNING_COMBOS)) {
    declareResults(`Player ${activePlayer.id} wins!`);
  } else {
    if (activeTiles.length) {
      swapPlayers();
    } else {
      declareResults('It\'s a Cat\'s Game!');
    }
  }
}

function resetBoard() {
  tiles.forEach(tile => {
    tile.isActive = true;
    tile.element.innerHTML = '';
  });
  activeTiles = new Array(...tiles);
}

function resetTileClaims() {
  players.forEach(player => player.clearClaimedTiles());
}

function deactivateBoard() {
  activeTiles.forEach(tile => tile.isActive = false);
}

function processTile(tileNumber) {
  const deactivatedTileIndex = activeTiles.findIndex(tile => tile.id === Number(tileNumber));
  const deactivatedTile = activeTiles.splice(deactivatedTileIndex, 1);

  deactivatedTile[0].isActive = false;
  activePlayer.addClaimedTile(tileNumber);
}

function declareResults(declaration) {
  message.innerHTML = declaration;
      setTimeout(() => {
        message.innerHTML = `Play again?`;
      }, 3000);
      deactivateBoard();
      hasFinished = true;
      controls.playButton.innerHTML = 'Play';
      controls.playButton.hidden = false;
}
