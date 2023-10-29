import Book from "./book.class"

export default class Cart {
  constructor() {
    this.data = []
  }

  getBookById(id) {
    return this.data.find((item) => item.id === id) || {}
  }

  populateData() {

  }

  addItem(book) {
    if (this.getBookById(book.id).id) {
      throw "El libro con id " + book.id + " ya está en el carrito"
    }
    const newBook = new Book(book)
    this.data.push(newBook)
    return newBook
  }

  removeItem(id) {
    const index = this.data.findIndex((item) => item.id === id)
    if (index === -1) {
      throw "En el carrito no hay un libro con esa id"
    }
    this.data.splice(index, 1)
    return {}
  }

  toString() {
    let booksToString = `Libros en el carrito (total ${this.data.length})`
    this.data.forEach((item) => booksToString += `
    - ${item}`)
    return booksToString
  }

}

