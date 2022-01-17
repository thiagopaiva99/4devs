import { render, screen } from '@testing-library/react'
import { SurveyList } from '@/presentation/pages'
import React from 'react'

describe('SurveyList Component', () => {
  it('should present 4 empty items on start', () => {
    render(<SurveyList />)
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4)
  })
})
