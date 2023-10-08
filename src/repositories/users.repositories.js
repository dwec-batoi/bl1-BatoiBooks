const SERVER = import.meta.env.VITE_URL_API

export default class UsersRepository {
  async getAllUsers() {
    const response = await fetch(SERVER + '/users')
    if (!response.ok) {
      throw `Error3 ${response.status} de la BBDD: ${response.statusText}`
    }
    const data = await response.json()
    return data
  }

  async getUserById(idUser) {
    const response = await fetch(SERVER + `/users/${idUser}`)
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const data = await response.json()
    return data
  }

  async addUser(item) {
    const response = await fetch(SERVER + `/users`, {
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

  async removeUser(id) {
    const response = await fetch(SERVER + `/users/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const data = await response.json()
    return data
  }

  async changeUser(item) {
    const response = await fetch(SERVER + `/users/${item.id}`, {
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

  async updateUserPassword(id, password) {
    const response = await fetch(SERVER + `/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ password }),
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
}
