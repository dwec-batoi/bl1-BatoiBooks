import User from "./user.class"
import UsersRepository from "../repositories/users.repository"

export default class Users {
  constructor() {
    this.data = []
  }
  
  async populateData() {
    const repository = new UsersRepository()
    const users = await repository.getAllUsers()
    this.data = users.map((item) => new User(
      item.id, 
      item.email, 
      item.nick, 
      item.password
    ))
  }

  async addItem(payload) {
    const repository = new UsersRepository()
    const user = await repository.addUser(payload)
    const newUser = new User(user.id, user.email, user.nick, user.password)
    this.data.push(newUser)
    return newUser
  }

  async removeItem(id) {
    const repository = new UsersRepository()
    await repository.removeUser(id)
    const index = this.getUserIndexById(id)
    // No necesitamos comprobar si devuelve -1 porque si no existe
    // el repositorio habrá lanzado un error que interrumpirá la fn
    this.data.splice(index, 1)
    return {}
  }

  toString() {
    let usersToString = `Usuarios (total ${this.data.length})`
    this.data.forEach((item) => usersToString += `
    - ${item}`)
    return usersToString
  }

  getUserById(id) {
    return this.data.find((item) => item.id === id) || {}
  }

  getUserIndexById(id) {
    return this.data.findIndex((item) => item.id === id)
  }

  getUserByNick(nick) {
    return this.data.find((item) => item.nick === nick) || {}
  }
}

