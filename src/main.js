let shelfOne = document.getElementById('shelf-one')
let addBookButton = document.getElementById('add-button-el')
let numberOfBooksRead = 0

const addBook = () => {
  shelfOne.innerHTML += `<div class=${randomizeBook()}></div>`
  console.log('Book added!')
  numberOfBooksRead++
}


const randomizeBook = () => {
  const books = ['purple', 'yellow', 'pink', 'red']

  let index = Math.floor(Math.random() * books.length)
  return books[index]
}

addBookButton.addEventListener('click', addBook)