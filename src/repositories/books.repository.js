const SERVER = import.meta.env.VITE_URL_API

export default class BooksRepository {
  async getAllBooks() {
    const response = await fetch(SERVER + '/books')
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const data = await response.json()
    return data
  }

  async getBookById(idBook) {
    const response = await fetch(SERVER + `/books/${idBook}`)
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const data = await response.json()
    return data
  }

  async addBook(item) {
    const response = await fetch(SERVER + `/books`, {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const data = await response.json()
    return data
  }

  async removeBook(id) {
    const response = await fetch(SERVER + `/books/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const data = await response.json()
    return data
  }

  async changeBook(item) {
    const response = await fetch(SERVER + `/books/${item.id}`, {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const data = await response.json()
    return data
  }

  async updatePriceOfBook(idBook, newPrice) {
    const response = await fetch(SERVER + `/books/${idBook}`, {
      method: 'PATCH',
      body: JSON.stringify({ price: newPrice }),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const data = await response.json()
    return data
  }
}
