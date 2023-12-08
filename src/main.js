let shelfOne = document.getElementById('shelf-one')
let addBookButton = document.getElementById('add-button-el')
let removeBookButton = document.getElementById('remove-button-el')
let books = document.querySelectorAll('article')


class Bookshelf {
  constructor(blah) {
    this.shelves = 3;
    this.bookCount = 0
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
  console.log('books on shelf', newOwner.bookshelf.bookCount)
  displayRemoveButton()
}

const displayRemoveButton = () => {
  if(newOwner.bookshelf.bookCount > 0) {
    removeBookButton.classList.remove('hidden')
  }
}

const removeBook = () => {
  console.log('shelf innards', shelfOne)

}



const randomizeBook = () => {
  const books = ['purple', 'yellow', 'pink', 'red']

  let index = Math.floor(Math.random() * books.length)
  return books[index]
}

addBookButton.addEventListener('click', addBook)
removeBookButton.addEventListener('click', removeBook)
