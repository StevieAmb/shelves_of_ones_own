export class Room {
  constructor(bookCount) {
    this.bookshelf = new Bookshelf(this.count)
    this.count = bookCount;
  }
}

console.log('room', this.count)

