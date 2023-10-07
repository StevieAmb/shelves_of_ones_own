let shelfOne = document.getElementById('shelf-one')
let addBookButton = document.getElementById('add-button-el')


const addBook = () => {
  shelfOne.innerHTML += `<div class=${randomizeBook()}></div>`
  console.log('Book added!')
}


const randomizeBook = () => {
  const books = ['purple', 'yellow', 'pink']

  let index = Math.floor(Math.random() * books.length)
  return books[index]
}

addBookButton.addEventListener('click', addBook)