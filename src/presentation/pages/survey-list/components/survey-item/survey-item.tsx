import { Icon, IconName } from '@/presentation/components'
import React from 'react'
import Styles from './survey-item.scss'

const SurveyItem: React.FC = () => {
  return (
        <li className={Styles.surveyItemWrap}>
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
  )
}

export default SurveyItem
