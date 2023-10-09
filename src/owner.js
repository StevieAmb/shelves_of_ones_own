class Owner {
  constructor() {
    this.room = new Room(this.bookCounts)
  }

  addBooks = () => {
    this.room.bookshelf.getBooks()
    this.room.bookshelf.numOfBooks++

    console.log('you worked', this.room.bookshelf.numOfBooks )
  }
}