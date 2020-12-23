export class UnauthorizedError extends Error {
  constructor () {
    super('Unauthorized User')
    this.name = 'UnauthorizedError'
  }
}
