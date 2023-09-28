import { describe, test, expect } from 'vitest'
import Module from '../src/model/module.class'

describe('Clase Module', () => {
  test('constructor crea un módulo', () => {
    const newModule = new Module('ABCD', 'Nuevo módulo', 'Nou mòdul', '12')
    expect(newModule).toEqual({
      code: 'ABCD',
      cliteral: 'Nuevo módulo',
      vliteral: 'Nou mòdul',
      idCourse: '12'
    });
  });

  test('toString pinta correctamente el módulo', () => {
    const newModule = new Module('ABCD', 'Nuevo módulo', 'Nou mòdul', '12')
    expect(newModule.toString()).toBe('ABCD Nou mòdul (Nuevo módulo)');
  });

})