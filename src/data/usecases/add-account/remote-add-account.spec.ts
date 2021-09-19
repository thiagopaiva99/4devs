import { HttpPostClientSpy } from '@/data/test'
import { AccountModel } from '@/domain/models'
import { mockAddAccountParams } from '@/domain/test'
import { AddAccountParams } from '@/domain/usecases'
import { internet } from 'faker'
import { RemoteAddAccount } from './remote-add-account'

type SutTypes = {
  sut: RemoteAddAccount
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>
}

const sutFactory = (url = internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AddAccountParams, AccountModel>()
  const sut = new RemoteAddAccount(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
  }
}

describe('Remote Authentication', () => {
  test('should call HttpPostClient with correct url', async () => {
    const url = internet.url()
    const { sut, httpPostClientSpy } = sutFactory(url)
    await sut.add(mockAddAccountParams())
    expect(httpPostClientSpy.url).toBe(url)
  })
})
