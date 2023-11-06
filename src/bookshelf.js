export class Bookshelf {
  constructor(count) {
    this.numOfBooks = count
  }

  getBooks = () => {
    console.log('books class', this.numOfBooks)
  }
}

