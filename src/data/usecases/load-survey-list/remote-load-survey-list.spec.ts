import { HttpGetClientSpy } from '@/data/test'
import { internet } from 'faker'
import { RemoteLoadSurveyList } from './remote-load-survey-list'

type Types = {
  remoteSurveyList: RemoteLoadSurveyList
  httpGetClientSpy: HttpGetClientSpy
}

const surveyFactory = (url: string = internet.url()): Types => {
  const httpGetClientSpy = new HttpGetClientSpy()
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
})
