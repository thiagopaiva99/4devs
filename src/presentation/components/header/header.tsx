import React, { memo } from 'react'
import { Logo } from '@/presentation/components'
import Styles from './header.scss'

const Header: React.FC = () => {
  return (
    <header className={Styles.headerWrap}>
        <div className={Styles.headerContent}>
            <Logo />
            <div className={Styles.userInfoWrap}>
                <span>Thiago</span>
                <a href="#">Sair</a>
            </div>
        </div>
    </header>
  )
}

export default memo(Header)
