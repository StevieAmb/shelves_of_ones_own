let shelfOne = document.getElementById('shelf-one')
let shelfTwo = document.getElementById('shelf-two')
let shelfThree = document.getElementById('shelf-three')
let addBookButton = document.getElementById('add-button-el')
let removeBookButton = document.getElementById('remove-button-el')
const clearShelf = document.getElementById('clear-shelf')
const addTitleInput = document.getElementById('add-book-title')
const bookCount = document.getElementById('bookCount')
let bookshelf = document.getElementById('bookshelf')


let newOwner = new Owner()

const updateBookCount = () => {
  let savedBooks = newOwner.bookCount;
  if(savedBooks) {
    bookCount.textContent = savedBooks;
  } else {
    bookCount.textContent = 0
  }
} 


const loadShelves = () => {
  let titles = newOwner.retrieveTitlesFromStorage()
  let savedBooks = newOwner.bookCount;
  if(savedBooks > 0) {
    for(let i = 0; i < savedBooks; i++) {
      if(i <= 10) {
        shelfOne.innerHTML += 
        `<article id={Math.random().toString(36).substr(2, 9)} class=${randomizeBook()} tabIndex="0">
          <p>${titles && titles[i]}</p>
        </article>`
      } else if (i >= 11 && i < 21 ) {
        shelfTwo.innerHTML += `<article id={Math.random().toString(36).substr(2, 9)} class=${randomizeBook()} tabIndex="0">
          <p>${titles && titles[i]}</p>
        </article>`
      } else {
        shelfThree.innerHTML += `<article id={Math.random().toString(36).substr(2, 9)} class=${randomizeBook()} tabIndex="0">
          <p>${titles && titles[i]}</p>
        </article>`
      }
    }
  } else {
    shelfOne.innerHTML = ``
    shelfTwo.innerHTML = ``
    shelfThree.innerHTML = ``
  }
}

const addBook = () => {
  newOwner.addBook()
  let savedBooks = newOwner.bookCount;
  if(savedBooks <= 9) {
    shelfOne.innerHTML += `<article class=${randomizeBook()} tabIndex="0"></article>`
  } else if(savedBooks >=10 && savedBooks <= 19) {
    shelfTwo.innerHTML += `<article class=${randomizeBook()} tabIndex="0"></article>`
  } else {
    shelfThree.innerHTML += `<article class=${randomizeBook()} tabIndex="0"></article>`
  }
  addBookTitle()
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
  if(parseInt(newOwner.bookCount) > 0) {
    show([clearShelf, removeBookButton])
  } 
}

const hideRemoveButton = () => {
  if (parseInt(newOwner.bookCount) < 1) {
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
  let books = document.querySelectorAll('article')
  let book = books[books.length - 1]
  if (newOwner.bookCount > 0 && book.parentNode) {
    book.parentNode.removeChild(book)
    newOwner.removeBook()
    updateBookCount()
  }
  hideRemoveButton()
}

const randomizeBook = () => {
  const books = ['red', 'blue', 'green']
  let index = Math.floor(Math.random() * books.length)
  return books[index]
}

const showRemoveBookButton = (e) => {
  console.log(e.target.tagName)
  if(e.target.tagName === 'P') {
    displayRemoveButton()
  }
}

const loadBooks = () => {
  updateBookCount()
  loadShelves()
}

const clearBookShelf = () => {
  newOwner.clearShelf()
  hideRemoveButton()
  loadBooks()
}

window.onload = loadBooks()
addBookButton.addEventListener('click', addBook)
removeBookButton.addEventListener('click', removeBook)
addTitleInput.addEventListener('keydown', enableAddBookButton)
clearShelf.addEventListener('click', clearBookShelf)
bookshelf.addEventListener('click', (e) => showRemoveBookButton(e) )

//So what I want is, when I click on any book on the bookshelf,
//The remove book button pops up.
//This means I need an event listener on the books, or maybe one up of it, so
//That when I click on any book, the button shows up.
//I need to put an event listener on the bookshelf, and then...
//I need to check the element and see if the class is red/green/blue,
//and if it is, then I show the remove book button.

