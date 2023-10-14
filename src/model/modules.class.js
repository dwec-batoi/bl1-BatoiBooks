import Module from "./module.class"
import ModulesRepository from "../repositories/modules.repository"

export default class Modules {
  constructor() {
    this.data = []
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

  async addItem(payload) {
    const repository = new ModulesRepository()
    const module = await repository.addModule(payload)
    const newModule = new Module(module.code, module.cliteral, module.vliteral, module.idCourse)
    this.data.push(newModule)
    return newModule
  }

  async removeItem(code) {
    const repository = new ModulesRepository()
    await repository.removeModule(code)
    const index = this.getModuleIndexByCode(code)
    // No necesitamos comprobar si devuelve -1 porque si no existe
    // el repositorio habrá lanzado un error que interrumpirá la fn
    this.data.splice(index, 1)
    return {}
  }

  getModuleByCode(code) {
    return this.data.find((item) => item.code === code) || {}
  }

  getModuleIndexByCode(code) {
    return this.data.findIndex((item) => item.code === code)
  }

  toString() {
    let modulesToString = `Módulos (total ${this.data.length})`
    this.data.forEach((item) => modulesToString += `
    - ${item}`)
    return modulesToString
  }
}
