let shelfOne = document.getElementById('shelf-one')
let addBookButton = document.getElementById('add-button-el')


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
  shelfOne.innerHTML += `<div class=${randomizeBook()} tabIndex="0"></div>`
  newOwner.bookshelf.bookCount++
}

const randomizeBook = () => {
  const books = ['purple', 'yellow', 'pink', 'red']

  let index = Math.floor(Math.random() * books.length)
  return books[index]
}

addBookButton.addEventListener('click', addBook)
