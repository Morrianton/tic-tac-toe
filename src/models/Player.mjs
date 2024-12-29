/**
 * Represents a player in the game.
 *
 * @class Player
 * @property {number} id - The unique identifier for the player.
 * @property {boolean} isActive - Indicates whether the player is currently active.
 * @property {string} symbolSrc - The source URL or path, relative to the index.html file for the player's symbol (e.g., an image URL).
 * @property {Array<string>} claimedTiles - A list of tiles claimed by the player.
 *
 * @method addClaimedTile(tile: Tile): void - Adds a tile object to the list of claimed tiles.
 * @method clearClaimedTiles(): void - Clears all claimed tiles.
 * @method toggleActivity(): void - Toggles the player's active status.
 */
class Player {
  /**
   * @type {number}
   */
  id;

  /**
   * @type {boolean}
   * @default false
   */
  isActive = false;

  /**
   * @type {string}
   */
  symbolSrc;

  /**
   * @type {Array<Tile>}
   * @default []
   */
  claimedTiles = new Array();

  /**
   * Creates a new player.
   * @param {number} id - The unique identifier for the player.
   * @param {string} symbolSrc - The source URL or path for the player's symbol.
   */
  constructor(id, symbolSrc) {
    this.id = id;
    this.symbolSrc = symbolSrc;
  }

  /**
   * Gets the player's unique identifier.
   * @returns {number} The player's ID.
   */
  get id() {
    return this.id;
  }

  /**
   * Gets the player's active status.
   * @returns {boolean} Whether the player is active.
   */
  get isActive() {
    return this.isActive;
  }

  /**
   * Gets the source of the player's symbol.
   * @returns {string} The symbol source.
   */
  get symbolSrc() {
    return this.symbolSrc;
  }

  /**
   * Adds a tile object to the list of claimed tiles.
   * @param {Tile} tile - The tile to add.
   */
  addClaimedTile(tile) {
    this.claimedTiles.push(tile);
  }

  /**
   * Clears all claimed tiles.
   */
  clearClaimedTiles() {
    this.claimedTiles = new Array();
  }

  /**
   * Toggles the player's active status.
   */
  toggleActivity() {
    this.isActive = !this.isActive;
  }
}

export default Player;