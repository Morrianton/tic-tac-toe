class Player {
  id;
  isActive = false;
  symbol;
  claimedTiles = new Array();

  constructor(id, symbol) {
    this.id = id;
    this.symbol = symbol;
  }

  get id() {
    return this.id;
  }

  get isActive() {
    return this.isActive;
  }

  get symbol() {
    return this.symbol;
  }

  addClaimedTile(tile) {
    this.claimedTiles.push(tile);
  }

  clearClaimedTiles() {
    this.claimedTiles = new Array();
  }

  toggleActivity() {
    this.isActive = !this.isActive;
  }
}

export default Player;