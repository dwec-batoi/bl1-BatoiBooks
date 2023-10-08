import { describe, test, expect, beforeEach, vi } from 'vitest'
import Users from '../src/model/users.class'
import User from '../src/model/user.class'
import UsersRepository from '../src/repositories/users.repositories'
import data from './fixtures/users.json'

let id = 0
vi.mock('../src/repositories/users.repositories')
UsersRepository.mockImplementation(() => {
  return {
    addUser: (item) => {
      item.id = ++id
      return item
    },
    getAllUsers: () => data,
    removeUser: (id) => {
      if (id === data[0].id || id === data[1].id)
        return {}
      return Promise.reject(new Error('empty'))
    }
  }
})

describe('Clase Users', () => {
  beforeEach(() => {
    id = 0
    UsersRepository.mockClear()
  })

  test('Existe la clase Users', () => {
    expect(Users).toBeDefined();
  });

  test('constructor crea el array en la propiedad data', () => {
    const users = new Users()
    expect(users.data).toEqual([]);
  });

  test('addItem añade un nuevo usuario', async () => {
    const users = new Users()
    const newUser = await users.addItem({ email: 'asd@asd.es', nick: 'dsa' })
    expect(newUser).toBeInstanceOf(User)
    expect(users.data.length).toBe(1)
    expect(newUser.id).toBe(1);
    expect(newUser.email).toBe('asd@asd.es');
    expect(newUser.nick).toBe('dsa');
  });

  test('addItem asigna id consecutivas sin repetir', async () => {
    const users = new Users()
    let newUser = await users.addItem({ email: 'asd@asd.es', nick: 'dsa' })
    expect(users.data.length).toBe(1)
    expect(newUser.id).toBe(1);
    newUser = await users.addItem({ email: 'usr@usr.es', nick: 'rsu' })
    expect(users.data.length).toBe(2)
    expect(newUser.id).toBe(2);
  });

  test('populateData añade un aray de usuarios', async () => {
    const users = new Users()
    await users.populateData()
    expect(users.data.length).toBe(2)
    for (let i in users.data) {
      expect(users.data[i]).toBeInstanceOf(User)
      for (let prop in users.data[i]) {
        expect(users.data[i][prop]).toBe(data[i][prop])
      }
    }
  });
})

describe('Clase Users', () => {
  let users
  beforeEach(() => {
    id = 0
    UsersRepository.mockClear()
    users = new Users()
    users.populateData()
  })

  test('removeItem elimina un usuario si existe', async () => {
    const userToRemove = await users.removeItem(data[1].id)
    expect(userToRemove).toEqual({});
    expect(users.data.length).toBe(1);
    await users.removeItem(data[0].id)
    expect(users.data.length).toBe(0);
  });

  test('removeItem lanza una excepción si un usuario no existe', () => {
    expect(async () => await users.removeItem(100)).rejects.toThrowError();
    expect(users.data.length).toBe(2);
  });

  test('toString pinta correctamente los usuarios', () => {
    expect(users.toString()).toBe(`Usuarios (total ${users.data.length})
    - ${data[0].nick} (${data[0].id}) - ${data[0].email}
    - ${data[1].nick} (${data[1].id}) - ${data[1].email}`)
  });

})