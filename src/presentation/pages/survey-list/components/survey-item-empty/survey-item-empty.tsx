import React from 'react'
import Styles from './survey-item-empty.scss'

const SurveyItemEmpty: React.FC = () => {
  return (
        <>
            <li className={Styles.surveyItemEmpty}></li>
            <li className={Styles.surveyItemEmpty}></li>
            <li className={Styles.surveyItemEmpty}></li>
            <li className={Styles.surveyItemEmpty}></li>
        </>
  )
}

export default SurveyItemEmpty
