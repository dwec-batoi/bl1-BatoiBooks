export default class View{
  constructor() {
    this.list = document.getElementById('list')
    this.about = document.getElementById('about')
    this.form = document.getElementById('form')
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
        <p>Precio: ${book.price}</p>
        <p>Páginas: ${book.pages}</p>
        <p>Estado: ${book.status}</p>
        <p>${book.soldDate?'Vendido el ' + book.soldDate:'En venta'}</p>
        <p>Comentarios: ${book.coments || ''}</p>
        <button class="add-cart" title="Añadir al carrito">
          <span class="material-icons">add_shopping_cart</span>
        </button>
        <button class="edit" title="Editar">
          <span class="material-icons">edit</span>
        </button>
        <button class="delete" title="Eliminar">
          <span class="material-icons">delete</span>
        </button>
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
}

