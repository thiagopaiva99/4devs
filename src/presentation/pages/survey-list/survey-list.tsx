import { Footer, Header, Icon, IconName } from '@/presentation/components'
import React from 'react'
import Styles from './survey-list.styles.scss'

const SurveyList: React.FC = () => {
  return (
        <div className={Styles.surveyListWrap}>
            <Header />
            <div className={Styles.contentWrap}>
                <h2>Enquetes</h2>
                <ul>

                    <li></li>
                </ul>
            </div>

            <Footer />
        </div>
  )
}

export { SurveyList }
