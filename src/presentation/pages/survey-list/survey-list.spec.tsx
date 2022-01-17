import { render, screen } from '@testing-library/react'
import { SurveyList } from '@/presentation/pages'
import React from 'react'

const surveyListFactory = (): void => {
  render(<SurveyList />)
}

describe('SurveyList Component', () => {
  it('should present 4 empty items on start', () => {
    surveyListFactory()
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4)
  })
})
