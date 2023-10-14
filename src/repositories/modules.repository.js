const SERVER = import.meta.env.VITE_URL_API

export default class ModulesRepository {
  async getAllModules() {
    const response = await fetch(SERVER + '/modules')
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const data = await response.json()
    return data
  }

  async getModuleById(idModule) {
    const response = await fetch(SERVER + `/modules/${idModule}`)
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const data = await response.json()
    return data
  }

  async addModule(item) {
    const response = await fetch(SERVER + `/modules`, {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const data = await response.json()
    return data
  }

  async removeModule(id) {
    // Json-server no acepta esta petición al no tener id
    const response = await fetch(SERVER + `/modules/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const data = await response.json()
    return data
  }

  async changeModule(item) {
    const response = await fetch(SERVER + `/modules/${item.id}`, {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const data = await response.json()
    return data
  }
}
