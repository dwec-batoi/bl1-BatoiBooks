import './style.css'
import batoiLogo from '/logoBatoi.png'
import data from './datos'
import Books from './src/model/books.class'

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

function init() {
  books.populateData(data.books)
}

init()
console.log(books.booksFromUser(4))
console.log(books.booksFromModule("5021").booksWithStatus("good"))
books.booksFromModule("5025").incrementPriceOfbooks(0.1)
console.log(books.booksFromModule("5025"))
