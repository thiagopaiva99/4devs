import React, { memo } from 'react';
import Spinner from '../spinner/spinner';
import Styles from './input-styles.scss';

const FormStatus: React.FC = () => (
    <section className={Styles.errorWrapper}>
                    <Spinner className={Styles.spinner} />
                    <span className={Styles.error}>Erro</span>
                </section>
);

export default FormStatus;