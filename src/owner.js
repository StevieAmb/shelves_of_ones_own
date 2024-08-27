class Owner {
  constructor(blah) {
    this.bookCount = parseInt(this.retrieveBooksFromStorage()) || 0;
    this.titles = this.retrieveTitlesFromStorage() || [];
  }

  addBook = () => {
    this.bookCount++
    this.saveBooksToStorage()
  }

  removeBook = () => {
    this.bookCount--
    this.saveBooksToStorage()
  }

  addTitle = (title) => {
    this.titles.push(title)
    this.saveTitlesToStorage()
  }

  saveTitlesToStorage = () => {
    localStorage.setItem('titles', JSON.stringify(this.titles))
  }

  retrieveTitlesFromStorage = () => {
    let parsedTitles = ''
    parsedTitles = JSON.parse(localStorage.getItem('titles'))
    console.log('parsed', parsedTitles)
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