let shelfOne = document.getElementById('shelf-one')
let shelfTwo = document.getElementById('shelf-two')
let shelfThree = document.getElementById('shelf-three')
let addBookButton = document.getElementById('add-button-el')
let removeBookButton = document.getElementById('remove-button-el')
const clearShelf = document.getElementById('clear-shelf')
const addTitleInput = document.getElementById('add-book-title')
const bookCount = document.getElementById('bookCount')


class Bookshelf {
  constructor(blah) {
    this.shelves = 3;
    this.bookCount = 0
  }
}

class Owner {
  constructor(blah) {
    this.bookCount = 0
  }

  addBook = () => {
    this.bookCount++
    this.saveBooksToStorage()
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
    this.bookCount = 0
  }
}

let newOwner = new Owner()

const addBook = () => {
  newOwner.addBook()
  if(newOwner.bookCount <= 10) {
    shelfOne.innerHTML += `<article class=${randomizeBook()} tabIndex="0"></article>`
  } else if(newOwner.bookCount > 10 && newOwner.bookCount <= 20) {
    shelfTwo.innerHTML += `<article class=${randomizeBook()} tabIndex="0"></article>`
  } else {
    shelfThree.innerHTML += `<article class=${randomizeBook()} tabIndex="0"></article>`
  }
  addBookTitle()
  displayRemoveButton()
  updateBookCount()
}

const updateBookCount = () => {
  bookCount.innerHTML = newOwner.retrieveBooksFromStorage() || 0
  // for(let i = 0; i < newOwner.retrieveBooksFromStorage(); i++) {
  //   shelfOne.innerHTML += `<article class=${randomizeBook()} tabIndex="0"></article>`
  // }
  // newOwner.clearShelf()
}

const enableAddBookButton = () => {
  !addTitleInput.value ? addBookButton.disabled = true : addBookButton.disabled = false
}

const displayRemoveButton = () => {
  if(newOwner.bookshelf.bookCount > 0) {
    removeBookButton.classList.remove('hidden')
  } 
}

const hideRemoveButton = () => {
  if (newOwner.bookshelf.bookCount < 1) {
    removeBookButton.classList.add('hidden')
  }
}

const removeBook = () => {
  newOwner.bookshelf.bookCount--
  let books = document.querySelectorAll('article')
  let book = books[books.length - 1]
  if(book.parentNode) {
    book.parentNode.removeChild(book)
  }
  hideRemoveButton()
}

const addBookTitle = () => {
  let books = document.querySelectorAll('article')
  let book = books[books.length - 1]
  book.innerHTML = `<p>${addTitleInput.value.toUpperCase()}</p>`
  addTitleInput.value = ""
}

const randomizeBook = () => {
  const books = ['red', 'blue', 'green']

  let index = Math.floor(Math.random() * books.length)
  return books[index]
}

window.addEventListener('onload', updateBookCount());
addBookButton.addEventListener('click', addBook)
removeBookButton.addEventListener('click', removeBook)
addTitleInput.addEventListener('keydown', enableAddBookButton)

