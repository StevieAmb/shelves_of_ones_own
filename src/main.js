let shelfOne = document.getElementById('shelf-one')
let shelfTwo = document.getElementById('shelf-two')
let shelfThree = document.getElementById('shelf-three')
let addBookButton = document.getElementById('add-button-el')
let removeBookButton = document.getElementById('remove-button-el')
const clearShelf = document.getElementById('clear-shelf')
const addTitleInput = document.getElementById('add-book-title')
const bookCount = document.getElementById('bookCount')
let bookshelf = document.getElementById('bookshelf')
let userLeftWall = document.getElementById('userLeftWall')
let userRoom = document.getElementById('userRoom')
let dropdown = document.getElementById('dropDown')
let dropdownPanel = document.getElementById('dropdownContent')

let newOwner = new Owner()
let newRoom = new Room()

const updateBookCount = () => {
  let savedBooks = newOwner.bookCount;
  if(savedBooks) {
    bookCount.textContent = savedBooks;
  } else {
    bookCount.textContent = 0
  }
} 

const changeToSelectedColor = (color) => {
  newRoom.addWallColor(color)

  const leftWallIsColored = userLeftWall.classList.contains(`added-user-color-${color}`)

  if(!leftWallIsColored) {
    userLeftWall.classList.remove(userLeftWall.classList[1])
    dropdownPanel.classList.remove(dropdownPanel.classList[1])
    dropdown.classList.remove(dropdown.classList[1])
  }

  userLeftWall.classList.add(`added-user-color-${color}`)
  userRoom.classList.add(`added-lighter-${color}`)
  dropdownPanel.classList.add(`added-user-color-${color}`)
  dropdown.classList.add(`added-user-color-${color}`)
}

const addSelectedColor = (e) => {
  let selectedColor = e.target.id.substring(0, (e.target.id.length - 9)) //This extracts the color chosen by user

  switch(e.target.id) {
    case 'redWallColor':
      changeToSelectedColor(selectedColor)
      break;
    case 'blueWallColor':
      changeToSelectedColor(selectedColor)
      break;
    case 'yellowWallColor':
      changeToSelectedColor(selectedColor)
      break;
    case 'greenWallColor':
      changeToSelectedColor(selectedColor)
      break;
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
  for(let i = 0; i < books.length; i++) {
    let cList = [...books[i].classList]
    if(cList.includes('picked')) {
      bookIndex = i
    }
  }
   books[bookIndex].remove()
   newOwner.removeBook()
   updateBookCount()
}

const randomizeBook = () => {
  const books = ['red', 'blue', 'green', 'purple', 'yellow']
  let index = Math.floor(Math.random() * books.length)
  return books[index]
}

const selectBook = (e) => {
  if(e.target.tagName === 'P') {
    e.target.parentNode.classList.toggle('picked')
    displayRemoveButton()
  }
}

const loadRoomColor = () => {
  changeToSelectedColor(newRoom.roomColor)
}

const loadRoom = () => {
  updateBookCount()
  loadShelves()
  loadRoomColor()
}

const clearBookShelf = () => {
  newOwner.clearShelf()
  hideRemoveButton()
  updateBookCount()
  loadShelves()
}

window.onload = loadRoom()
addBookButton.addEventListener('click', addBook)
removeBookButton.addEventListener('click', removeBook)
addTitleInput.addEventListener('keydown', enableAddBookButton)
clearShelf.addEventListener('click', clearBookShelf)
bookshelf.addEventListener('click', (e) => selectBook(e) ) //make this select book
dropdownPanel.addEventListener('click', (e) => addSelectedColor(e))
