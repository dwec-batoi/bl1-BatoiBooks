import Book from "./book.class"
import BooksRepository from "../repositories/books.repository"

const NOTES = 'Apunts'

export default class Books {
  constructor() {
    this.data = []
  }

  getBookById(id) {
    return this.data.find((item) => item.id === id) || {}
  }

  async populateData() {
    const repository = new BooksRepository()
    const books = await repository.getAllBooks()
    this.data = books.map((item) => new Book(item))
  }

  async addItem(payload) {
    const repository = new BooksRepository()
    const book = await repository.addBook(payload)
    const newBook = new Book(book)
    this.data.push(newBook)
    return newBook
  }

  async removeItem(id) {
    const repository = new BooksRepository()
    await repository.removeBook(id)
    const index = this.data.findIndex((item) => item.id === id)
    // No necesitamos comprobar si devuelve -1 porque si no existe
    // el repositorio habrá lanzado un error que interrumpirá la fn
    this.data.splice(index, 1)
    return {}
  }

  toString() {
    let booksToString = `Libros (total ${this.data.length})`
    this.data.forEach((item) => booksToString += `
    - ${item}`)
    return booksToString
  }

  booksFromUser(userId) {
    const filteredBooks = new Books()
    filteredBooks.data = this.data.filter((item) => item.idUser === userId)
    return filteredBooks
  }

  booksFromModule(moduleId) {
    const filteredBooks = new Books()
    filteredBooks.data = this.data.filter((item) => item.idModule === moduleId)
    return filteredBooks
  }

  booksCheeperThan(price) {
    const filteredBooks = new Books()
    filteredBooks.data = this.data.filter((item) => item.price <= price)
    return filteredBooks
  }

  booksWithStatus(status) {
    const filteredBooks = new Books()
    filteredBooks.data = this.data.filter((item) => item.status === status)
    return filteredBooks
  }

  averagePriceOfBooks() {
    const sum = this.data.reduce((total, item) => total + item.price, 0)
    return this.data.length
      ? (sum / this.data.length).toFixed(2) + ' €'
      : '0 €'
  }

  booksOfTypeNote() {
    const filteredBooks = new Books()
    filteredBooks.data = this.data.filter((item) => item.publisher === NOTES)
    return filteredBooks
  }

  booksNotOfTypeNote() {
    const filteredBooks = new Books()
    filteredBooks.data = this.data.filter((item) => item.publisher !== NOTES)
    return filteredBooks
  }

  booksNotSold() {
    const filteredBooks = new Books()
    filteredBooks.data = this.data.filter((item) => !item.soldDate)
    return filteredBooks
  }

  incrementPriceOfbooks(increment) {
    const repository = new BooksRepository()
    this.data.forEach(async (book) => {
      const newPrice = book.price * (1 + increment)
      const roundedPrice = Math.round(newPrice * 100) / 100
      const bookChanged = await repository.updatePriceOfBook(book.id, roundedPrice)
      book.price = bookChanged.price
    })
  }
}

