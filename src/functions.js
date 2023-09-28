'use strict'

const NOTES = 'Apunts'

function booksFromUser(books, userId) {
  return books.filter((item) => item.idUser === userId)
}

function booksFromModule(books, moduleId) {
  return books.filter((item) => item.idModule === moduleId)
}

function booksCheeperThan(books, price) {
  return books.filter((item) => item.price <= price)
}

function booksWithStatus(books, status) {
  return books.filter((item) => item.status === status)
}

function averagePriceOfBooks(books) {
  const sum = books.reduce((total, item) => total + item.price, 0)
  return books.length
    ? (sum / books.length).toFixed(2) + ' €'
    : '0.00 €'
}

function booksOfTypeNote(books) {
  return books.filter((item) => item.publisher === NOTES)
}

function booksNotOfTypeNote(books) {
  return books.filter((item) => item.publisher !== NOTES)
}

function booksNotSold(books) {
  return books.filter((item) => !item.soldDate)
}

function incrementPriceOfbooks(books, increment) {
  return books.map((item) => {
    item.price = item.price + item.price * increment
    return item
  })
}

function getUserById(users, id) {
  return users.find((item) => item.id === id) || {}
}

function getUserIndexById(users, id) {
  return users.findIndex((item) => item.id === id)
}

function getUserByNickName(users, nick) {
  return users.find((item) => item.nick === nick) || {}
}

function getModuleByCode(modules, code) {
  return modules.find((item) => item.code === code) || {}
}

function getModuleIndexByCode(modules, code) {
  return modules.findIndex((item) => item.code === code)
}

export {
  booksFromUser,
  booksFromModule,
  booksCheeperThan,
  booksWithStatus,
  averagePriceOfBooks,
  booksOfTypeNote,
  booksNotOfTypeNote,
  booksNotSold,
  incrementPriceOfbooks,
  getUserById,
  getUserIndexById,
  getUserByNickName,
  getModuleByCode,
  getModuleIndexByCode
}