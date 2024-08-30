let shelfOne = document.getElementById('shelf-one')
let shelfTwo = document.getElementById('shelf-two')
let shelfThree = document.getElementById('shelf-three')
let addBookButton = document.getElementById('add-button-el')
let removeBookButton = document.getElementById('remove-button-el')
const clearShelf = document.getElementById('clear-shelf')
const addTitleInput = document.getElementById('add-book-title')
const bookCount = document.getElementById('bookCount')


let newOwner = new Owner()

const updateBookCount = () => {
  let savedBooks = newOwner.bookCount;
  console.log(savedBooks)
  if(savedBooks) {
    bookCount.textContent = savedBooks;
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
    } else if (i >= 11 && i < 21 ) {
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

const addBookTitle = () => {
  let books = document.querySelectorAll('article')
  let book = books[books.length - 1]
  newOwner.addTitle(addTitleInput.value.toUpperCase())
  book.innerHTML = `<p>${addTitleInput.value.toUpperCase()}</p>`
  newOwner.titles.push(addTitleInput.value.toUpperCase())
  addTitleInput.value = ""
}

 const enableAddBookButton = () => {
  !addTitleInput.value ? addBookButton.disabled = true : addBookButton.disabled = false
}

const displayRemoveButton = () => {
  if(parseInt(newOwner.retrieveBooksFromStorage()) > 0) {
    show([clearShelf, removeBookButton])
  } 
}

const hideRemoveButton = () => {
  if (parseInt(newOwner.retrieveBooksFromStorage()) < 1) {
    hide([clearShelf, removeBookButton])
  }
}

const show = (elements) => {
  elements.forEach(elem => {
    elem.classList.remove('hidden')
  })
}

const hide = (elements) => {
  elements.forEach(elem => {
    elem.classList.add('hidden')
  })
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

const randomizeBook = () => {
  const books = ['red', 'blue', 'green']
  let index = Math.floor(Math.random() * books.length)
  return books[index]
}

const loadBooks = () => {
  updateBookCount()
  loadShelves()
}

const clearBookShelf = () => {
  newOwner.clearShelf()
  console.log(localStorage)
  loadShelves()
}

window.onload = loadBooks()
addBookButton.addEventListener('click', addBook)
removeBookButton.addEventListener('click', removeBook)
addTitleInput.addEventListener('keydown', enableAddBookButton)
clearShelf.addEventListener('click', clearBookShelf)

