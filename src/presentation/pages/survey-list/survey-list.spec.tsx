import { render, screen } from '@testing-library/react'
import { SurveyList } from '@/presentation/pages'
import React from 'react'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0
  async loadAll (): Promise<SurveyModel[]> {
    this.callsCount++
    return []
  }
}

type SurveyListFactoryTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
}

const surveyListFactory = (): SurveyListFactoryTypes => {
  const loadSurveyListSpy = new LoadSurveyListSpy()
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />)
  return {
    loadSurveyListSpy
  }
}

describe('SurveyList Component', () => {
  it('should present 4 empty items on start', () => {
    surveyListFactory()
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4)
  })

  it('should call load survey list', () => {
    const { loadSurveyListSpy } = surveyListFactory()
    expect(loadSurveyListSpy.callsCount).toBe(1)
  })
})
