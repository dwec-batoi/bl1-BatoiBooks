import Module from "./module.class"
import ModulesRepository from "../repositories/modules.repositories"

export default class Modules {
  constructor() {
    this.data = []
  }
  
  getModuleByCode(code) {
    return this.data.find((item) => item.code === code) || {}
  }

  async populateData() {
    const repository = new ModulesRepository()
    const modules = await repository.getAllModules()
    this.data = modules.map((item) => new Module(
      item.code, 
      item.cliteral, 
      item.vliteral, 
      item.idCourse
    ))
  }

  addItem(payload) {
    const newModule = new Module(payload.code, payload.cliteral, payload.vliteral, payload.idCourse)
    this.data.push(newModule)
    return newModule
  }

  removeItem(code) {
    const index = this.data.findIndex((item) => item.code === code)
    if (index === -1) {
      throw "No existe un módulo con código " + code
    }
    this.data.splice(index, 1)
    return {}
  }

  toString() {
    let modulesToString = `Módulos (total ${this.data.length})`
    this.data.forEach((item) => modulesToString += `
    - ${item}`)
    return modulesToString
  }
}
