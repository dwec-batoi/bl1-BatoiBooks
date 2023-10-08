import { describe, test, expect, vi, beforeEach } from 'vitest'
import data from './fixtures/modules.json'
import ModulesRepository from '../src/repositories/modules.repositories'

const SERVER = import.meta.env.VITE_URL_API

global.fetch = vi.fn()

function createFetchResponse(data) {
  return {
    ok: true,
    json: () => new Promise((resolve) => resolve(data))
  }
}


describe('LLamadas a Modules', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  test('makes a GET request to fetch modules list and returns the result', async () => {
    fetch.mockResolvedValue(createFetchResponse(data))
    const repository = new ModulesRepository()
    const modules = await repository.getAllModules()

    expect(fetch).toHaveBeenCalledWith(SERVER + '/modules')

    expect(modules).toStrictEqual(data)
  })

  test('makes a GET request to fetch a module and returns the result', async () => {
    fetch.mockResolvedValue(createFetchResponse(data[0]))
    const repository = new ModulesRepository()
    const module = await repository.getModuleById(data[0].id)

    expect(fetch).toHaveBeenCalledWith(SERVER + '/modules/' + data[0].id)

    expect(module).toStrictEqual(data[0])
  })

  test('makes a POST request to save a module and returns the result', async () => {
    fetch.mockResolvedValue(createFetchResponse(data[0]))
    const repository = new ModulesRepository()
    const module = await repository.addModule(data[0])

    expect(fetch).toHaveBeenCalledWith(SERVER + '/modules',
      {
        method: 'POST',
        body: JSON.stringify(data[0]),
        headers: {
          'Content-Type': 'application/json'
        },
      })

    expect(module).toStrictEqual(data[0])
  })

  test('makes a DELETE request to remove a module and returns the result', async () => {
    fetch.mockResolvedValue(createFetchResponse({}))
    const repository = new ModulesRepository()
    const module = await repository.removeModule(data[0].id)

    expect(fetch).toHaveBeenCalledWith(SERVER + '/modules/' + data[0].id, {
      method: 'DELETE'
    })

    expect(module).toStrictEqual({})
  })

  test('makes a PUT request to change a module and returns the result', async () => {
    fetch.mockResolvedValue(createFetchResponse(data[0]))
    const repository = new ModulesRepository()
    const module = await repository.changeModule(data[0])

    expect(fetch).toHaveBeenCalledWith(SERVER + '/modules/' + data[0].id,
    {
      method: 'PUT',
      body: JSON.stringify(data[0]),
      headers: {
        'Content-Type': 'application/json'
      },
    })

    expect(module).toStrictEqual(data[0])
  })
})
