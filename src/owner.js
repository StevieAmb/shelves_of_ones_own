class Owner {
  constructor(blah) {
    this.titles = this.retrieveTitlesFromStorage() || [];
    this.bookCount = this.titles.length
  }

  addBook = () => {
    // this.bookCount++
    this.saveBooksToStorage()
  }

  removeBook = () => {
    this.bookCount--
    this.saveBooksToStorage()
  }

  addTitle = (title) => {
    this.titles.push(title)
    this.saveTitlesToStorage()
    console.log('books', this.titles)
  }

  saveTitlesToStorage = () => {
    localStorage.setItem('titles', JSON.stringify(this.titles))
  }

  retrieveTitlesFromStorage = () => {
    let parsedTitles = ''
    parsedTitles = JSON.parse(localStorage.getItem('titles'))
    return parsedTitles;
  }

  saveBooksToStorage = () => {
    localStorage.setItem('numOfBooks', JSON.stringify(this.bookCount));
  }

  retrieveBooksFromStorage = () => {
    let parsedBookCount = JSON.parse(localStorage.getItem('numOfBooks'));
    return parsedBookCount;
  }

  clearShelf = () => {
    localStorage.clear()
    this.bookCount = 0
  }
}