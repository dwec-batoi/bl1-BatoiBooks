export default class Book {
  constructor(book) {
    this.id = book.id
    this.idUser = book.idUser
    this.idModule = book.idModule
    this.publisher = book.publisher
    this.price = book.price
    this.pages = book.pages
    this.status = book.status
    this.photo = book.photo
    this.comments = book.comments
    this.soldDate = book.soldDate || ''
  }

  toString() {
    return `${this.idModule}. Editorial: ${this.publisher}. ${this.pages} páginas. ${this.price.toFixed(2)} €.`
  }
}
