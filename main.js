import './style.css'
import batoiLogo from '/logoBatoi.png'
import Books from './src/model/books.class'
import Modules from './src/model/modules.class'
import Users from './src/model/users.class'

const users = new Users
const modules = new Modules
const books = new Books

document.querySelector('#app').innerHTML = `
  <div>
    <a href="http://www.cipfpbatoi.es" target="_blank">
      <img src="${batoiLogo}" class="logo" alt="CIP FP Batoi" />
    </a>
    <p class="read-the-docs">
      Abre la consola (F12)
    </p>
  </div>
`

async function init() {
  await Promise.all([
    users.populateData(),
    modules.populateData(),
    books.populateData()
  ])
  console.log(books.booksFromUser(4))
  console.log(books.booksFromModule("5021").booksWithStatus("good"))
  books.booksFromModule("5025").incrementPriceOfbooks(0.1)
  console.log(books.booksFromModule("5025"))
}

init()

