let shelfOne = document.getElementById('shelf-one')
let addBookButton = document.getElementById('add-button-el')
let removeBookButton = document.getElementById('remove-button-el')
const clearShelf = document.getElementById('clear-shelf')


class Bookshelf {
  constructor(blah) {
    this.shelves = 3;
    this.bookCount = 0
  }

  saveBooksToStorage = () => {
    localStorage.setItem('numOfBooks', JSON.stringify(this.bookCount));
  }

  retrieveBooksFromStorage = () => {
    let parsedBookCount = ''
    parsedBookCount = JSON.parse(localStorage.getItem('numOfBooks'));
    return parsedBookCount;
  }

  clearShelf = () => {
    localStorage.clear()
  }
  
}

class Owner {
  constructor(blah) {
    this.bookCount = 0
    this.bookshelf = new Bookshelf(blah)
  }
}

let newOwner = new Owner()

const addBook = () => {
  shelfOne.innerHTML += `<article class=${randomizeBook()} tabIndex="0"></article>`
  newOwner.bookshelf.bookCount++
  newOwner.bookshelf.saveBooksToStorage()
  displayRemoveButton()
}

const displayRemoveButton = () => {
  if(newOwner.bookshelf.bookCount > 0) {
    removeBookButton.classList.remove('hidden')
  } 
}

const removeBook = () => {
  let books = document.querySelectorAll('article')
  let book = books[books.length - 1]
  if(book.parentNode) {
    book.parentNode.removeChild(book)
  }
  newOwner.bookshelf.bookCount--
}

const randomizeBook = () => {
  const books = ['yellow', 'red', 'blue', 'green', 'orange', 'purple']

  let index = Math.floor(Math.random() * books.length)
  return books[index]
}

addBookButton.addEventListener('click', addBook)
removeBookButton.addEventListener('click', removeBook)
// clearShelf.addEventListener('click', clearTheShelf)
