let shelfOne = document.getElementById('shelf-one')
let shelfTwo = document.getElementById('shelf-two')
let shelfThree = document.getElementById('shelf-three')
let addBookButton = document.getElementById('add-button-el')
let removeBookButton = document.getElementById('remove-button-el')
const clearShelf = document.getElementById('clear-shelf')
const addTitleInput = document.getElementById('add-book-title')
const bookCount = document.getElementById('bookCount')

class Owner {
  constructor(blah) {
    this.bookCount = parseInt(this.retrieveBooksFromStorage()) || 0;
    this.titles = this.retrieveTitlesFromStorage() || [];
  }

  addBook = () => {
    this.bookCount++
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

let newOwner = new Owner()

const updateBookCount = () => {
  let savedBooks = parseInt(newOwner.retrieveBooksFromStorage())
  if(savedBooks) {
    bookCount.textContent = newOwner.retrieveBooksFromStorage()
  } else {
    bookCount.textContent = 0
  }
} 


const loadShelves = () => {
  let titles = newOwner.retrieveTitlesFromStorage()
  let savedBooks =  parseInt(newOwner.retrieveBooksFromStorage())
  for(let i = 0; i < savedBooks; i++) {
    if(i <= 10) {
      shelfOne.innerHTML += `<article class=${randomizeBook()} tabIndex="0"><p>${titles && titles[i]}</p></article>`
    } else if (i >= 11 && i < 20 ) {
      shelfTwo.innerHTML += `<article class=${randomizeBook()} tabIndex="0"></article>`
    } else {
      shelfThree.innerHTML += `<article class=${randomizeBook()} tabIndex="0"></article>`
    }
  }
}

const addBook = () => {
  newOwner.addBook()
  let savedBooks = parseInt(newOwner.retrieveBooksFromStorage())
  if(savedBooks <= 9) {
    shelfOne.innerHTML += `<article class=${randomizeBook()} tabIndex="0"></article>`
  } else if(savedBooks >=10 && savedBooks <= 19) {
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
  newOwner.bookCount--
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
  newOwner.addTitle(addTitleInput.value.toUpperCase())
  book.innerHTML = `<p>${addTitleInput.value.toUpperCase()}</p>`
  newOwner.titles.push(addTitleInput.value.toUpperCase())
  addTitleInput.value = ""
}

const addTitle = () => {
  //And then store that array into localStorage, we also need to be able
  //To retrieve the array
  //Then on load, we'll iterate through the titles and somehow add them
  //That can be in the loadshelf function, so we call the titles
  //In the loadshelf function, and then add them in as they are iterating
}

const randomizeBook = () => {
  const books = ['red', 'blue', 'green']

  let index = Math.floor(Math.random() * books.length)
  return books[index]
}

const loadBooks = () => {
  updateBookCount()
  loadShelves()
}

window.onload = loadBooks()
addBookButton.addEventListener('click', addBook)
removeBookButton.addEventListener('click', removeBook)
addTitleInput.addEventListener('keydown', enableAddBookButton)

