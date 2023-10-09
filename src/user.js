class User {
  constructor() {
    this.bookCount = 0;
    this.room = new Room(this.bookCounts)
  }

  addBooks = () => {
    this.room.bookshelf.numOfBooks++
  }


}