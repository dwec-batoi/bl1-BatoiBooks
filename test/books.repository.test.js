import { describe, test, expect, vi, beforeEach } from 'vitest'
import data from './fixtures/books.json'
import BooksRepository from '../src/repositories/books.repositories'

const SERVER = import.meta.env.VITE_URL_API

global.fetch = vi.fn()

function createFetchResponse(data) {
  return {
    ok: true,
    json: () => new Promise((resolve) => resolve(data))
  }
}


describe('LLamadas a Books', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  test('makes a GET request to fetch books list and returns the result', async () => {
    fetch.mockResolvedValue(createFetchResponse(data))
    const repository = new BooksRepository()
    const books = await repository.getAllBooks()

    expect(fetch).toHaveBeenCalledWith(SERVER + '/books')

    expect(books).toStrictEqual(data)
  })

  test('makes a GET request to fetch a book and returns the result', async () => {
    fetch.mockResolvedValue(createFetchResponse(data[0]))
    const repository = new BooksRepository()
    const book = await repository.getBookById(data[0].id)

    expect(fetch).toHaveBeenCalledWith(SERVER + '/books/' + data[0].id)

    expect(book).toStrictEqual(data[0])
  })

  test('makes a POST request to save a book and returns the result', async () => {
    fetch.mockResolvedValue(createFetchResponse(data[0]))
    const repository = new BooksRepository()
    const book = await repository.addBook(data[0])

    expect(fetch).toHaveBeenCalledWith(SERVER + '/books',
      {
        method: 'POST',
        body: JSON.stringify(data[0]),
        headers: {
          'Content-Type': 'application/json'
        },
      })

    expect(book).toStrictEqual(data[0])
  })

  test('makes a DELETE request to remove a book and returns the result', async () => {
    fetch.mockResolvedValue(createFetchResponse({}))
    const repository = new BooksRepository()
    const book = await repository.removeBook(data[0].id)

    expect(fetch).toHaveBeenCalledWith(SERVER + '/books/' + data[0].id, {
      method: 'DELETE'
    })

    expect(book).toStrictEqual({})
  })

  test('makes a PUT request to change a book and returns the result', async () => {
    fetch.mockResolvedValue(createFetchResponse(data[0]))
    const repository = new BooksRepository()
    const book = await repository.changeBook(data[0])

    expect(fetch).toHaveBeenCalledWith(SERVER + '/books/' + data[0].id,
    {
      method: 'PUT',
      body: JSON.stringify(data[0]),
      headers: {
        'Content-Type': 'application/json'
      },
    })

    expect(book).toStrictEqual(data[0])
  })

  test('makes a PATCH request to change the price of a book and returns the result', async () => {
    const bookChanged = Object.assign({}, data[0])
    const newPrice = 23.78

    bookChanged.price = newPrice
    fetch.mockResolvedValue(createFetchResponse(bookChanged))
    const repository = new BooksRepository()
    const book = await repository.updatePriceOfBook(data[0].id, newPrice)

    expect(fetch).toHaveBeenCalledWith(SERVER + '/books/' + data[0].id,
    {
      method: 'PATCH',
      body: JSON.stringify({ price: newPrice }),
      headers: {
        'Content-Type': 'application/json'
      },
    })

    expect(book).toStrictEqual(bookChanged)
  })
})
