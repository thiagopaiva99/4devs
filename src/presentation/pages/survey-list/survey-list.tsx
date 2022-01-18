import { SurveyModel } from '@/domain/models'
import { LoadSurveyList } from '@/domain/usecases'
import { Footer, Header, Icon, IconName } from '@/presentation/components'
import React, { useEffect, useState } from 'react'
import { SurveyItem, SurveyItemEmpty } from './components'
import Styles from './survey-list.styles.scss'

type SurveyListTypes = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<SurveyListTypes> = ({ loadSurveyList }: SurveyListTypes) => {
  const [state, setState] = useState({ surveys: [] as SurveyModel[] })

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => setState({ surveys }))
  }, [])

  return (
        <div className={Styles.surveyListWrap}>
            <Header />
            <div className={Styles.contentWrap}>
                <h2>Enquetes</h2>
                <ul data-testid="survey-list">
                  {state.surveys.length
                    ? state.surveys.map((survey: SurveyModel) => (<SurveyItem key={survey.id} survey={survey} />))
                    : <SurveyItemEmpty />
                  }
                </ul>
            </div>

            <Footer />
        </div>
  )
}

export { SurveyList }
