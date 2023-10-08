import { describe, test, expect, beforeEach, vi } from 'vitest'
import Modules from '../src/model/modules.class'
import Module from '../src/model/module.class'
import ModulesRepository from '../src/repositories/modules.repositories'
import data from './fixtures/modules.json'

vi.mock('../src/repositories/modules.repositories')
ModulesRepository.mockImplementation(() => {
  return {
    addModule: (item) => item,
    getAllModules: () => data,
    removeModule: (id) => {
      if (id === data[0].id || id === data[1].id)
        return {}
      return Promise.reject(new Error('empty'))
    }
  }
})

describe('Clase Modules', () => {
  beforeEach(() => {
    ModulesRepository.mockClear()
  })

	test('Existe la clase Modules', () => {
		expect(Modules).toBeDefined();
	});
  
  test('constructor crea el array en la propiedad data', () => {
    const modules = new Modules()
    expect(modules.data).toEqual([]);
  });
  
  test('addItem añade un nuevo módulo', async () => {
    const modules = new Modules()
    const newModule = await modules.addItem({ code: 'AAAA', cliteral: 'Nuevo módulo', vliteral: 'Nou mòdul', idCourse: '12' })
    expect(newModule).toBeInstanceOf(Module)
    expect(modules.data.length).toBe(1)
    expect(newModule.code).toBe('AAAA');
    expect(newModule.cliteral).toBe('Nuevo módulo');
    expect(newModule.vliteral).toBe('Nou mòdul');
    expect(newModule.idCourse).toBe('12');
  });

  test('populateData añade un array de módulos', async () => {
    const modules = new Modules()
    await modules.populateData()
    expect(modules.data.length).toBe(2)
    for (let i in modules.data) {
      expect(modules.data[i]).toBeInstanceOf(Module)
      for (let prop in modules.data[i]) {
        expect(modules.data[i][prop]).toBe(data[i][prop])
      }
    }
  });
})

describe('Clase Modules', () => {
  let modules
  beforeEach(() => {
    ModulesRepository.mockClear()
    modules = new Modules()
    modules.populateData()
  })

  test('removeItem elimina un módulo si existe', async () => {
    const moduleToRemove = await modules.removeItem(data[1].code)
    expect(moduleToRemove).toEqual({});
    expect(modules.data.length).toBe(1);
    await modules.removeItem(data[0].code)
    expect(modules.data.length).toBe(0);
  });

  test('removeItem lanza una excepción si un módulo no existe', () => {
    expect(async () => await modules.removeItem('ZXCV')).rejects.toThrow();
    expect(modules.data.length).toBe(2);
  });

  test('toString pinta correctamente los módulos', () => {
    expect(modules.toString()).toBe(`Módulos (total ${modules.data.length})
    - ${data[0].code} ${data[0].vliteral} (${data[0].cliteral})
    - ${data[1].code} ${data[1].vliteral} (${data[1].cliteral})`)
  });

})