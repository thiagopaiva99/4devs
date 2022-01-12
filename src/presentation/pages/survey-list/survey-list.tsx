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
                    <li>
                        <div className={Styles.surveyContent}>
                            <Icon className={Styles.iconWrap} iconName={IconName.thumbDown} />
                            <time>
                                <span className={Styles.day}>31</span>
                                <span className={Styles.month}>12</span>
                                <span className={Styles.year}>2021</span>
                            </time>
                            <p>Qual é seu framework web favorito?</p>
                        </div>
                        <footer>Ver Resultado</footer>
                    </li>
                </ul>
            </div>

            <Footer />
        </div>
  )
}

export { SurveyList }
