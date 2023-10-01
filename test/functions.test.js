import { describe, expect, test } from 'vitest'
import {
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
} from '../functions'

describe('Funciones con libros', () => {
  const books = [
    {
      id: 3,
      idUser: 22,
      idModule: "DWEC",
      publisher: "Apunts",
      price: 125,
      pages: 25,
      status: "good",
      soldDate: "2023-02-01"
    },
    {
      id: 2,
      idUser: 22,
      idModule: "DWES",
      publisher: "McGraw-Hill",
      price: 21,
      pages: 12,
      status: "good",
      soldDate: ""
    },
    {
      id: 31,
      idUser: 2,
      idModule: "DWEC",
      publisher: "Apunts",
      price: 34,
      pages: 34,
      status: "bad",
      soldDate: ""
    },
  ];

  test('booksFromUser 22 devuelve un array con 2 libros', () => {
    const response = booksFromUser(books, 22)
    expect(response.length).toBe(2)
    expect(response[0].id).toBe(3)
    expect(response[1].id).toBe(2)
  });

  test('booksFromUser 12 devuelve un array vacío', () => {
    const response = booksFromUser(books, 12)
    expect(response).toEqual([])
  });

  test('booksFromModule DWEC devuelve un array con 2 libros', () => {
    const response = booksFromModule(books, 'DWEC')
    expect(response.length).toBe(2)
    expect(response[0].id).toBe(3)
    expect(response[1].id).toBe(31)
  });

  test('booksFromModule WECV devuelve un array vacío', () => {
    const response = booksFromModule(books, 'WECV')
    expect(response).toEqual([])
  });

  test('booksCheeperThan 100 devuelve un array con 2 libros', () => {
    const response = booksCheeperThan(books, 100)
    expect(response.length).toBe(2)
    expect(response[0].id).toBe(2)
    expect(response[1].id).toBe(31)
  });

  test('booksCheeperThan 1 devuelve un array vacío', () => {
    const response = booksCheeperThan(books, 1)
    expect(response).toEqual([])
  });

  test('booksWithStatus good devuelve un array con 2 libros', () => {
    const response = booksWithStatus(books, 'good')
    expect(response.length).toBe(2)
    expect(response[0].id).toBe(3)
    expect(response[1].id).toBe(2)
  });

  test('booksWithStatus new devuelve un array vacío', () => {
    const response = booksWithStatus(books, 'new')
    expect(response).toEqual([])
  });

  test('averagePriceOfBooks devuelve 60', () => {
    const response = averagePriceOfBooks(books)
    expect(response).toBe('60.00 €')
  });

  test('averagePriceOfBooks de un array vacío devuelve 0', () => {
    const response = averagePriceOfBooks([])
    expect(response).toBe('0.00 €')
  });

  test('booksOfTypeNote devuelve un array con 2 libros', () => {
    const response = booksOfTypeNote(books)
    expect(response.length).toBe(2)
    expect(response[0].id).toBe(3)
    expect(response[1].id).toBe(31)
  });

  test('booksNotOfTypeNote WECV devuelve un array con 1 libro', () => {
    const response = booksNotOfTypeNote(books, 'WECV')
    expect(response.length).toBe(1)
    expect(response[0].id).toBe(2)
  });

  test('booksNotSold devuelve un array con 2 libros', () => {
    const response = booksNotSold(books)
    expect(response.length).toBe(2)
    expect(response[0].id).toBe(2)
    expect(response[1].id).toBe(31)
  });

  test('incrementPriceOfbooks incrementa correctamente el precio', () => {
    const booksToIncrement = [
      {
        id: 5,
        price: 0
      },
      {
        id: 7,
        price: 13
      },
    ]
    incrementPriceOfbooks(booksToIncrement, 0.05)
    expect(booksToIncrement).toEqual([
      {
        id: 5,
        price: 0
      },
      {
        id: 7,
        price: 13.65
      },
    ])
  });
})

describe('Funciones con usuarios', () => {
  const users = [
    {
      id: 4,
      nick: 'Marc'
    },
    {
      id: 2,
      nick: 'Maria'
    },
  ]

  test('getUserById encuentra un usuario que existe', () => {
    expect(getUserById(users, 2)).toEqual({
      id: 2,
      nick: 'Maria'
    });
  });

  test('getUserById devuelve un objeto vacío si el usuario no existe', () => {
    expect(getUserById(users, 7)).toEqual({});
  });

  test('getUserIndexById encuentra un usuario que existe', () => {
    expect(getUserIndexById(users, 2)).toBe(1);
  });

  test('getUserIndexById encuentra el primer usuario del array', () => {
    expect(getUserIndexById(users, 4)).toBe(0);
  });

  test('getUserIndexById devuelve -1 si el usuario no existe', () => {
    expect(getUserIndexById(users, 7)).toBe(-1);
  });

  test('getUserByNickName encuentra un usuario que existe', () => {
    expect(getUserByNickName(users, 'Maria')).toEqual({
      id: 2,
      nick: 'Maria'
    });
  });

  test('getUserByNickName devuelve un objeto vacío si el usuario no existe', () => {
    expect(getUserByNickName(users, 'Pep')).toEqual({});
  });
})

describe('Funciones con módulos', () => {
  const modules = [
    {
      id: 4,
      code: 'DWEC'
    },
    {
      id: 2,
      code: 'DWES'
    },
  ]

  test('getModuleByCode encuentra un módulo que existe', () => {
    expect(getModuleByCode(modules, 'DWES')).toEqual({
      id: 2,
      code: 'DWES'
    });
  })

  test('getModuleByCode devuelve un objeto vacío si el módulo no existe', () => {
    expect(getModuleByCode(modules, 'AAAA')).toEqual({});
  });

  test('getModuleIndexByCode encuentra un módulo que existe', () => {
    expect(getModuleIndexByCode(modules, 'DWES')).toBe(1);
  });

  test('getModuleIndexByCode encuentra el primer módulo del array', () => {
    expect(getModuleIndexByCode(modules, 'DWEC')).toBe(0);
  });

  test('getModuleIndexByCode devuelve -1 si el módulo no existe', () => {
    expect(getModuleIndexByCode(modules, 'AAAA')).toBe(-1);
  });
})


