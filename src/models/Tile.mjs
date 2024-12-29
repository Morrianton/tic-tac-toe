class Tile {
  id;
  isActive = true;
  value;
  element;

  constructor(id, element) {
    this.id = id;
    this.element = element;
  }

  get isActive() {
    return this.isActive;
  }

  get element() {
    return this.element;
  }

  get value() {
    return this.value;
  }

  set value(newValue) {
    if (this.isActive) this.value = newValue;
  }

  set isActive(activityState) {
    this.isActive = activityState;
  }
}

export default Tile;
