import { HttpGetClientSpy } from '@/data/test'
import { internet } from 'faker'
import { RemoteLoadSurveyList } from './remote-load-survey-list'

describe('RemoteLoadSurveyList', () => {
  test('should call HttpGetClient with correct url', async () => {
    const url = internet.url()
    const httpGetClientSpy = new HttpGetClientSpy()
    const remoteSurveyList = new RemoteLoadSurveyList(url, httpGetClientSpy)
    await remoteSurveyList.loadAll()
    expect(httpGetClientSpy.url).toBe(url)
  })
})
