export default class Module {
  constructor(code, cliteral, vliteral, idCourse) {
    this.code = code
    this.cliteral = cliteral
    this.vliteral = vliteral
    this.idCourse = idCourse
  }

  toString() {
    return `${this.code} ${this.vliteral} (${this.cliteral})`
  }
}
