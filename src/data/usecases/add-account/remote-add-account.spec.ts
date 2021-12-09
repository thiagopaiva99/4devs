import { HttpStatusCode } from '@/data/protocols/http'
import { HttpPostClientSpy } from '@/data/test'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { mockAccountModel, mockAddAccountParams } from '@/domain/test'
import { internet } from 'faker'
import { RemoteAddAccount } from './remote-add-account'

type SutTypes = {
  sut: RemoteAddAccount
  httpPostClientSpy: HttpPostClientSpy<AccountModel>
}

const sutFactory = (url = internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AccountModel>()
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

  test('should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = sutFactory()
    const addAccountBody = mockAddAccountParams()
    await sut.add(addAccountBody)
    expect(httpPostClientSpy.body).toEqual(addAccountBody)
  })

  test('should throw EmailInUseeError if HttpPostClient returns 401', async () => {
    const { sut, httpPostClientSpy } = sutFactory()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.FORBIDDEN
    }
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new EmailInUseError())
  })

  test('should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = sutFactory()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.BAD_REQUEST
    }
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = sutFactory()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR
    }
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = sutFactory()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.NOT_FOUND
    }
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should return an AccountModel if HttpPostClient return 200', async () => {
    const { sut, httpPostClientSpy } = sutFactory()
    const httpResult = mockAccountModel()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.OK,
      body: httpResult
    }
    const account = await sut.add(mockAddAccountParams())
    await expect(account).toEqual(httpResult)
  })
})
