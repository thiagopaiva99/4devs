import { HttpStatusCode } from '@/data/protocols/http'
import { HttpGetClientSpy } from '@/data/test'
import { UnexpectedError } from '@/domain/errors'
import { SurveyModel } from '@/domain/models'
import { mockSurveyListModel } from '@/domain/test'
import { internet } from 'faker'
import { RemoteLoadSurveyList } from './remote-load-survey-list'

type Types = {
  remoteSurveyList: RemoteLoadSurveyList
  httpGetClientSpy: HttpGetClientSpy<SurveyModel[]>
}

const surveyFactory = (url: string = internet.url()): Types => {
  const httpGetClientSpy = new HttpGetClientSpy<SurveyModel[]>()
  const remoteSurveyList = new RemoteLoadSurveyList(url, httpGetClientSpy)

  return { httpGetClientSpy, remoteSurveyList }
}

describe('RemoteLoadSurveyList', () => {
  test('should call HttpGetClient with correct url', async () => {
    const url = internet.url()
    const { httpGetClientSpy, remoteSurveyList } = surveyFactory(url)
    await remoteSurveyList.loadAll()
    expect(httpGetClientSpy.url).toBe(url)
  })

  test('should throw UnexpectedError if HttpGetClient returns 403', async () => {
    const { remoteSurveyList, httpGetClientSpy } = surveyFactory()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.FORBIDDEN
    }
    const promise = remoteSurveyList.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should throw UnexpectedError if HttpGetClient returns 404', async () => {
    const { remoteSurveyList, httpGetClientSpy } = surveyFactory()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.NOT_FOUND
    }
    const promise = remoteSurveyList.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { remoteSurveyList, httpGetClientSpy } = surveyFactory()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR
    }
    const promise = remoteSurveyList.loadAll()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should return an list of SurveyModel if HttpGetClient return 200', async () => {
    const { remoteSurveyList, httpGetClientSpy } = surveyFactory()
    const httpResult = mockSurveyListModel()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.OK,
      body: httpResult
    }
    const surveyList = await remoteSurveyList.loadAll()
    await expect(surveyList).toEqual(httpResult)
  })

  test('should return an empty list of SurveyModel if HttpGetClient return 204', async () => {
    const { remoteSurveyList, httpGetClientSpy } = surveyFactory()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.NO_CONTENT
    }
    const surveyList = await remoteSurveyList.loadAll()
    await expect(surveyList).toEqual([])
  })
})
