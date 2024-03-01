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

const updateBookCount = () => {
  newOwner.retrieveBooksFromStorage()
  bookCount.innerHTML = newOwner.retrieveBooksFromStorage() || 0
} 

// const loadShelves = () => {
//   loadShelfOne()
// }

const loadShelves = () => {
  let savedBooks =  parseInt(newOwner.retrieveBooksFromStorage())
  for(let i = 0; i < savedBooks; i++) {
    if(i <= 10) {
      shelfOne.innerHTML += `<article class=${randomizeBook()} tabIndex="0"></article>`
    } else if (i >= 11 && i < 18 ) {
      shelfTwo += `<article class=${randomizeBook()} tabIndex="0"></article>`
    } else {
      shelfThree += `<article class=${randomizeBook()} tabIndex="0"></article>`
    }
  }
}

//So, we are starting with a whole number, and we don't know how many.
//Let's say the number is one, on load, there's going to be one book, and the 
//iterator is going to iterate on it going backwards, in order to load the books
//

const addBook = () => {
  newOwner.addBook()
  if(newOwner.bookCount <= 9) {
    shelfOne.innerHTML += `<article class=${randomizeBook()} tabIndex="0"></article>`
  } else if(newOwner.bookCount > 9 && newOwner.bookCount <= 19) {
    shelfTwo.innerHTML += `<article class=${randomizeBook()} tabIndex="0"></article>`
  } else {
    shelfThree.innerHTML += `<article class=${randomizeBook()} tabIndex="0"></article>`
  }
  addBookTitle()
  displayRemoveButton()
  updateBookCount()
}



const enableAddBookButton = () => {
  !addTitleInput.value ? addBookButton.disabled = true : addBookButton.disabled = false
}

const displayRemoveButton = () => {
  if(newOwner.bookCount > 0) {
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

window.addEventListener('onload', () => {
  updateBookCount()
  loadShelves()
});
addBookButton.addEventListener('click', addBook)
removeBookButton.addEventListener('click', removeBook)
addTitleInput.addEventListener('keydown', enableAddBookButton)

