import React, { memo } from 'react';
import Styles from './input-styles.scss';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input: React.FC<Props> = (props: Props) => (
    <div className={Styles.inputWrapper}>
        <input {...props} autoComplete="off" />
        <span className={Styles.status}>🔴</span>
    </div>
);

export default Input;