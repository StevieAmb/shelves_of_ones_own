export class Owner {
  constructor() {
    this.bookCounts = 0
    this.room = new Room(this.bookCounts)
  }

  addBooks = () => {
    this.bookCounts++
    return this.bookCounts
  }
}
