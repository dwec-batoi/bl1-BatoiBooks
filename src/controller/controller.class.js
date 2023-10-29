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
    this.view.renderModulesInSelect(this.modules.data)
    this.books.data.forEach((book) => {
      const bookUI = this.view.renderBook(book)
      this.setBookListeners(book, bookUI)
    })
      
    this.view.bookForm.addEventListener('submit', async (event) => {
      event.preventDefault()

      const payload = this.view.getBookFormValues()
      let book = {}
      try {
        book = await this.books.addItem(payload)
      } catch(err) {
        this.view.renderErrorMessage('error', 'Error borrando el libro: '+ err)
        return
      }
      const bookUI = this.view.renderBook(book)
      this.setBookListeners(book, bookUI)
    })
  }

  setBookListeners(book, bookUI) {
    // Listener de añadir al carrito
    bookUI.querySelector('button.cart').addEventListener('click', () => {
      try {
        this.cart.addItem(book)
        this.view.renderErrorMessage('info', 'Libro añadido al carrito')
      } catch (err) {
        this.view.renderErrorMessage('error', 'Error añadiendo el libro: '+ err)
      }
    })
    
    // Listener de borrar
    bookUI.querySelector('button.delete').addEventListener('click', async () => {
      if (confirm('Vas a borrar el libro con id ' + book.id 
      + ' del módulo "' + book.idModule + '"')) {
        try {
          await this.books.removeItem(book.id)
        } catch(err) {
          this.view.renderErrorMessage('error', 'Error borrando el libro: '+ err)
        }
        this.view.renderRemoveBook(book.id)  
      }
    })

    // Listener de editar
    bookUI.querySelector('button.edit').addEventListener('click', () => this.view.renderFormToEdit(book))    
  }
}
