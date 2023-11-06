import { Owner } from "./owner"
import { Room } from "./room"
import { Bookshelf}  from "./bookshelf"

let shelfOne = document.getElementById('shelf-one')
let addBookButton = document.getElementById('add-button-el')

let Room;
let Owner;
let Bookshelf

const addBook = () => {
  let newOwner = new Owner()
  let addedBooks = newOwner.addBooks()
  console.log('weird', addedBooks)
  for(let i = 0; i < addedBooks; i++) {
    shelfOne.innerHTML += `<div class=${randomizeBook()} tabIndex="0"></div>`
    console.log('huh', addedBooks)
  }
  console.log('clicked')
}


const randomizeBook = () => {
  const books = ['purple', 'yellow', 'pink', 'red']

  //blue, brown, turquoise, green, orange, lightblue, neongreen, white

  let index = Math.floor(Math.random() * books.length)
  return books[index]
}

addBookButton.addEventListener('click', addBook)