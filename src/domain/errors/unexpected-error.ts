export class UnexpectedError extends Error {
  constructor () {
    super('Erro Inesperado')
    this.name = 'UnexpectedError'
  }
}
