import { LoadSurveyList } from '@/domain/usecases'
import { Footer, Header, Icon, IconName } from '@/presentation/components'
import React, { useEffect } from 'react'
import { SurveyItemEmpty } from './components'
import Styles from './survey-list.styles.scss'

type SurveyListTypes = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<SurveyListTypes> = ({ loadSurveyList }: SurveyListTypes) => {
  useEffect(() => {
    (async function () {
      loadSurveyList.loadAll()
    })()
  }, [])
  return (
        <div className={Styles.surveyListWrap}>
            <Header />
            <div className={Styles.contentWrap}>
                <h2>Enquetes</h2>
                <ul data-testid="survey-list">
                    <SurveyItemEmpty />
                </ul>
            </div>

            <Footer />
        </div>
  )
}

export { SurveyList }
