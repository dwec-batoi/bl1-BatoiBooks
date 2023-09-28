import './style.css'
import batoiLogo from '/logoBatoi.png'
import data from './datos'
import {
  booksFromUser,
  booksFromModule,
  booksCheeperThan,
  booksWithStatus,
  averagePriceOfBooks,
  booksOfTypeNote,
  booksNotOfTypeNote,
  booksNotSold,
  incrementPriceOfbooks,
  getUserById,
  getUserIndexById,
  getUserByNickName,
  getModuleByCode,
  getModuleIndexByCode
} from './scripts/functions'

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

console.log(booksFromUser(data.books, 4))
console.log(booksWithStatus(booksFromModule(data.books, "5021"), "good"))
incrementPriceOfbooks(booksFromModule(data.books, "5025"), 0.1)
console.log(booksFromModule(data.books, "5025"))
