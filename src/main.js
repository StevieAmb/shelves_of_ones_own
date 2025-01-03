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
  let bookIndex;
  let books = document.getElementsByTagName('article')
  console.log(books)
  for(let i = 0; i < books.length; i++) {
    let cList = [...books[i].classList]
    if(cList.includes('picked')) {
      bookIndex = i
    }
  }
   console.log(bookIndex) //yellow book is undefined
   books[bookIndex].remove()
   newOwner.removeBook()
   updateBookCount()
}

const randomizeBook = () => {
  const books = ['red', 'blue', 'green', 'purple', 'yellow']
  let index = Math.floor(Math.random() * books.length)
  console.log('hello')
  return books[index]
}

const selectBook = (e) => {
  if(e.target.tagName === 'P') {
    e.target.parentNode.classList.toggle('picked')
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
bookshelf.addEventListener('click', (e) => selectBook(e) ) //make this select book

//If I want to have a functionality that removes the book, what I can do is I can
//Add a classlist on click, so that the one that is clicked can have a tag on it, maybe
//that's where I put the isolation for the box shadow.
//Then, what i do is I check that class, and if that is the one that is clicked, then I remove it.

