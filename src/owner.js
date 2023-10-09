class Owner {
  constructor() {
    this.room = new Room(this.bookCounts)
  }

  addBooks = () => {
    this.room.bookshelf.numOfBooks++
  }


}