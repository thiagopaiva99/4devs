import { datatype, date, internet, random } from 'faker'
import { SurveyModel } from '../models'

export const mockSurveyListModel = (): SurveyModel[] => ([
  {
    id: datatype.uuid(),
    question: random.words(10),
    didAnswer: datatype.boolean(),
    date: date.recent(),
    answers: [
      {
        answer: random.words(50),
        image: internet.url()
      },
      {
        answer: random.words(50),
        image: internet.url()
      }
    ]
  }
])
