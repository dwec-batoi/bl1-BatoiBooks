import { describe, test, expect, beforeEach } from 'vitest'
import Modules from '../src/model/modules.class'
import Module from '../src/model/module.class'


let modules, module1, module2

describe('Clase Modules', () => {
	test('Existe la clase Modules', () => {
		expect(Modules).toBeDefined();
	});
  
  test('constructor crea el array en la propiedad data', () => {
    const modules = new Modules()
    expect(modules.data).toEqual([]);
  });
  
  test('addItem añade un nuevo módulo', () => {
    const modules = new Modules()
    const newModule = modules.addItem({ code: 'AAAA', cliteral: 'Nuevo módulo', vliteral: 'Nou mòdul', idCourse: '12' })
    expect(newModule).toBeInstanceOf(Module)
    expect(newModule.code).toBe('AAAA');
    expect(newModule.cliteral).toBe('Nuevo módulo');
    expect(newModule.vliteral).toBe('Nou mòdul');
    expect(newModule.idCourse).toBe('12');
    expect(modules.data.length).toBe(1)
  });

  test('populateData añade un array de módulos', () => {
    const data = [
      { code: 'AAAA', cliteral: 'Nuevo módulo', vliteral: 'Nou mòdul', idCourse: '12' },
      { code: 'BBAA', cliteral: 'Otro módulo', vliteral: 'Altre mòdul', idCourse: '1ert2' },
    ]
    const modules = new Modules()
    modules.populateData(data)
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
  beforeEach(() => {
    modules = new Modules()
    module1 = modules.addItem({ code: 'AAAA', cliteral: 'Nuevo módulo', vliteral: 'Nou mòdul', idCourse: '12' })
    module2 = modules.addItem({ code: 'BBAA', cliteral: 'Otro módulo', vliteral: 'Altre mòdul', idCourse: '1ert2' })
  })

  test('removeItem elimina un módulo si existe', () => {
    const moduleToRemove = modules.removeItem(module2.code)
    expect(moduleToRemove).toEqual({});
    expect(modules.data.length).toBe(1);
    modules.removeItem(module1.code)
    expect(modules.data.length).toBe(0);
  });

  test('removeItem lanza una excepción si un módulo no existe', () => {
    expect(() => modules.removeItem('ZXCV')).toThrow();
    expect(modules.data.length).toBe(2);
  });

  test('toString pinta correctamente los módulos', () => {
    expect(modules.toString()).toBe(`Módulos (total ${modules.data.length})
    - ${module1.code} ${module1.vliteral} (${module1.cliteral})
    - ${module2.code} ${module2.vliteral} (${module2.cliteral})`)
  });

})