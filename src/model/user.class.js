export default class User {
  constructor(id, email, nick) {
    this.id = id
    this.email = email
    this.nick = nick
  }

  toString() {
    return `${this.nick} (${this.id}) - ${this.email}`
  }
}
