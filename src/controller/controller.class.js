import Books from '../model/books.class'
import Users from '../model/users.class'
import Modules from '../model/modules.class'
import View from '../view/view.class'

export default class Controller {
  constructor() {
    this.books = new Books()
    this.users = new Users()
    this.modules = new Modules()
    this.view = new View()
  }

  async init() {
    try {
      await Promise.all([
        this.books.populateData(),
        this.users.populateData(),
        this.modules.populateData(),
      ])
    } catch(err) {
      this.view.renderErrorMessage('error', 'Error cargando los datos: '+ err)
      return
    }
    this.view.renderErrorMessage('info', 'Datos cargados correctamente')
    this.view.renderModulesInSelect(this.modules.data)
    this.books.data.forEach((book) => this.view.renderBook(book))

    this.view.remove.addEventListener('click', async () => {
      const bookIdToRemove = prompt('Introduce la id del libro que quieres eliminar')
      if (!bookIdToRemove || isNaN(bookIdToRemove)) {
        this.view.renderErrorMessage('error', 'Debes introducir una id')
        return
      }
      if (!this.books.getBookById(Number(bookIdToRemove)).id) {
        this.view.renderErrorMessage('error', 'La id introducida no existe')
        return
      }
      try {
        await this.books.removeItem(Number(bookIdToRemove))
      } catch(err) {
        this.view.renderErrorMessage('error', 'Error borrando el libro: '+ err)
        return
      }
      this.view.renderRemoveBook(bookIdToRemove)
    })
      
    this.view.bookForm.addEventListener('submit', async (event) => {
      event.preventDefault()

      const payload = this.view.getBookFormValues()
      payload.price = Number(payload.price)
      payload.pages = Number(payload.pages)

      try {
        const book = await this.books.addItem(payload)
        this.view.renderBook(book)
      } catch(err) {
        this.view.renderErrorMessage('error', 'Error borrando el libro: '+ err)
        return
      }
    })
  }
}
