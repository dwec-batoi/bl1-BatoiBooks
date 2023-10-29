export default class View{
  constructor() {
    this.list = document.getElementById('list')
    this.about = document.getElementById('about')
    this.form = document.getElementById('form')
    this.remove = document.getElementById('remove')
    this.bookForm = document.getElementById('bookForm')
    this.messages = document.getElementById('messages')
  }

  renderBook(book) {
    const bookUI = document.createElement('div')
    bookUI.id = 'book-'+book.id
    bookUI.className = 'card'
    bookUI.innerHTML = `
    <img src="${book.photo}" alt="Lbro: ${book.id}">
      <div>
        <h5>${book.idModule + ' (' + book.id +')'}</h5>
        <h6>${book.publisher}</h6>
        <p>Precio: ${book.price.toFixed(2)} €</p>
        <p>Páginas: ${book.pages}</p>
        <p>Estado: ${book.status}</p>
        <p>${book.soldDate?'Vendido el ' + book.soldDate:'En venta'}</p>
        <p>Comentarios: ${book.comments || ''}</p>
      </div>
    `
    this.list.appendChild(bookUI)
    this.bookForm.reset()
  }

  renderModulesInSelect(modules) {
    const selectModules = document.getElementById('id-module')
    modules.forEach((module) => {
        const moduleUI = document.createElement('option')
        moduleUI.value = module.code
        moduleUI.textContent = module.cliteral
        selectModules.appendChild(moduleUI)
    })
  }

  renderRemoveBook(id) {
    const bookUI = document.getElementById('book-'+id)
    bookUI.parentElement.removeChild(bookUI)
  }

  renderErrorMessage(type, message) {
    const messageUI = document.createElement('div')
    messageUI.className = type + ' alert alert-danger alert-dismissible'
    messageUI.setAttribute('role', 'alert')
    messageUI.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="this.parentElement.remove()">x</button>
    `
    this.messages.appendChild(messageUI)
    window.scroll(0,0)
  }

  getBookFormValues() {
    const idModule = this.bookForm.elements['id-module'].value
    // También podríamos coger el input directamente con su id
    // document.getElementById('id-module').value
    const publisher = this.bookForm.elements.publisher.value
    const price = this.bookForm.elements.price.value
    const pages = this.bookForm.elements.pages.value
    const status = this.bookForm.querySelector('input[name="status"]:checked').value
    const comments = this.bookForm.elements.comments.value

    return {
      idModule,
      publisher,
      price,
      pages,
      status,
      comments
    }
  }
}

