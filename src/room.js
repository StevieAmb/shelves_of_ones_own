class Room {
  constructor() {
    this.roomColor = this.retrieveColorFromStorage() || 'purple'
  }

  addWallColor = (color) => {
    this.roomColor = color
    this.saveColorToStorage()
  }

  saveColorToStorage = () => {
    localStorage.setItem('roomColor', JSON.stringify(this.roomColor))
  }

  retrieveColorFromStorage = () => {
    let storedColor = JSON.parse(localStorage.getItem('roomColor'))
    return storedColor;
  }
  
}