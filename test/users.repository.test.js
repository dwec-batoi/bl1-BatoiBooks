import { describe, test, expect, vi, beforeEach } from 'vitest'
import data from './fixtures/users.json'
import UsersRepository from '../src/repositories/users.repositories'

const SERVER = import.meta.env.VITE_URL_API

global.fetch = vi.fn()

function createFetchResponse(data) {
  return {
    ok: true,
    json: () => new Promise((resolve) => resolve(data))
  }
}


describe('LLamadas a Users', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  test('makes a GET request to fetch users list and returns the result', async () => {
    fetch.mockResolvedValue(createFetchResponse(data))
    const repository = new UsersRepository()
    const users = await repository.getAllUsers()

    expect(fetch).toHaveBeenCalledWith(SERVER + '/users')

    expect(users).toStrictEqual(data)
  })

  test('makes a GET request to fetch an user and returns the result', async () => {
    fetch.mockResolvedValue(createFetchResponse(data[0]))
    const repository = new UsersRepository()
    const user = await repository.getUserById(data[0].id)

    expect(fetch).toHaveBeenCalledWith(SERVER + '/users/' + data[0].id)

    expect(user).toStrictEqual(data[0])
  })

  test('makes a POST request to save an user and returns the result', async () => {
    fetch.mockResolvedValue(createFetchResponse(data[0]))
    const repository = new UsersRepository()
    const user = await repository.addUser(data[0])

    expect(fetch).toHaveBeenCalledWith(SERVER + '/users',
      {
        method: 'POST',
        body: JSON.stringify(data[0]),
        headers: {
          'Content-Type': 'application/json'
        },
      })

    expect(user).toStrictEqual(data[0])
  })

  test('makes a DELETE request to remove an user and returns the result', async () => {
    fetch.mockResolvedValue(createFetchResponse({}))
    const repository = new UsersRepository()
    const user = await repository.removeUser(data[0].id)

    expect(fetch).toHaveBeenCalledWith(SERVER + '/users/' + data[0].id, {
      method: 'DELETE'
    })

    expect(user).toStrictEqual({})
  })

  test('makes a PUT request to change an user and returns the result', async () => {
    fetch.mockResolvedValue(createFetchResponse(data[0]))
    const repository = new UsersRepository()
    const user = await repository.changeUser(data[0])

    expect(fetch).toHaveBeenCalledWith(SERVER + '/users/' + data[0].id,
    {
      method: 'PUT',
      body: JSON.stringify(data[0]),
      headers: {
        'Content-Type': 'application/json'
      },
    })

    expect(user).toStrictEqual(data[0])
  })

  test('makes a PATCH request to change the password of an user and returns the result', async () => {
    const userChanged = Object.assign({}, data[0])
    const newPassword = 'provaP@ssw0rd'

    userChanged.password = newPassword
    fetch.mockResolvedValue(createFetchResponse(userChanged))
    const repository = new UsersRepository()
    const user = await repository.updateUserPassword(data[0].id, newPassword)

    expect(fetch).toHaveBeenCalledWith(SERVER + '/users/' + data[0].id,
    {
      method: 'PATCH',
      body: JSON.stringify({ password: newPassword }),
      headers: {
        'Content-Type': 'application/json'
      },
    })

    expect(user).toStrictEqual(userChanged)
  })
})
