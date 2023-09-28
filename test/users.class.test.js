import { describe, test, expect, beforeEach } from 'vitest'
import Users from '../src/model/users.class'
import User from '../src/model/user.class'


let users, user1, user2

describe('Clase Users', () => {
	test('Existe la clase Users', () => {
		expect(Users).toBeDefined();
	});

  test('constructor crea el array en la propiedad data', () => {
    const users = new Users()
    expect(users.data).toEqual([]);
  });
  
  test('addItem añade un nuevo usuario', () => {
    const users = new Users()
    const newUser = users.addItem({ email: 'asd@asd.es', nick: 'dsa' })
    expect(users.data.length).toBe(1)
    expect(newUser).toBeInstanceOf(User)
    expect(newUser.id).toBe(1);
    expect(newUser.email).toBe('asd@asd.es');
    expect(newUser.nick).toBe('dsa');
  });

  test('addItem asigna id consecutivas sin repetir', () => {
    const users = new Users()
    let newUser = users.addItem({ email: 'asd@asd.es', nick: 'dsa' })
    expect(users.data.length).toBe(1)
    expect(newUser.id).toBe(1);
    newUser = users.addItem({ email: 'usr@usr.es', nick: 'rsu' })
    expect(users.data.length).toBe(2)
    expect(newUser.id).toBe(2);
  });

  test('populateData añade un aray de usuarios', () => {
    const data = [
      { id:7, email: 'asd@asd.es', nick: 'dsa' },
      { id:3, email: 'usr@usr.es', nick: 'rsu' },
    ]
    const users = new Users()
    users.populateData(data)
    expect(users.data.length).toBe(2)
    for (let i in users.data) {
      expect(users.data[i]).toBeInstanceOf(User)
      for (let prop in users.data[i]) {
        expect(users.data[i][prop]).toBe(data[i][prop])
      }
    }
  });

  test('addItem asigna id a partir de la última existente', () => {
    const data = [
      { id:7, email: 'asd@asd.es', nick: 'dsa' },
      { id:3, email: 'usr@usr.es', nick: 'rsu' },
    ]
    const users = new Users()
    users.populateData(data)
    let newUser = users.addItem({ email: 'qwe@qwe.es', nick: 'ewq' })
    expect(users.data.length).toBe(3)
    expect(newUser.id).toBe(8);
  });
})

describe('Clase Users', () => {
  beforeEach(() => {
    users = new Users()
    user1 = users.addItem({ email: 'asd@asd.es', nick: 'dsa' })
    user2 = users.addItem({ email: 'usr@usr.es', nick: 'rsu' })
  })

  test('removeItem elimina un usuario si existe', () => {
    const userToRemove = users.removeItem(user2.id)
    expect(userToRemove).toEqual({});
    expect(users.data.length).toBe(1);
    users.removeItem(user1.id)
    expect(users.data.length).toBe(0);
  });

  test('removeItem lanza una excepción si un usuario no existe', () => {
    expect(() => users.removeItem(100)).toThrow();
    expect(users.data.length).toBe(2);
  });

  test('toString pinta correctamente los usuarios', () => {
    expect(users.toString()).toBe(`Usuarios (total ${users.data.length})
    - ${user1.nick} (${user1.id}) - ${user1.email}
    - ${user2.nick} (${user2.id}) - ${user2.email}`)
  });

})