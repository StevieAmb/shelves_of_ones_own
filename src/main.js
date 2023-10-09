let newOwner = new Owner()

let shelfOne = document.getElementById('shelf-one')
let addBookButton = document.getElementById('add-button-el')


const addBook = () => {
  newOwner.addBooks()
  for(let i = 0; i === newOwner.room.bookshelf.numOfBooks; i++) {
    shelfOne.innerHTML += `<div class=${randomizeBook()} tabIndex="0"></div>`
  }
}


const randomizeBook = () => {
  const books = ['purple', 'yellow', 'pink', 'red']

  //blue, brown, turquoise, green, orange, lightblue, neongreen, white

  let index = Math.floor(Math.random() * books.length)
  return books[index]
}

addBookButton.addEventListener('click', addBook)