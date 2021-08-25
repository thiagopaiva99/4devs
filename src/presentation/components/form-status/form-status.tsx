import React, { memo, useContext } from 'react';
import Spinner from '../spinner/spinner';
import Styles from './form-status-styles.scss';
import Context from '@/presentation/contexts/form/form-context';

const FormStatus: React.FC = () => {
    const { state, errorState } = useContext(Context);
    
    const { isLoading } = state;
    const { main } = errorState;

    return (
        <section data-testid="error-wrapper" className={Styles.errorWrapper}>
            { isLoading && <Spinner className={Styles.spinner} /> }
            { main && <span className={Styles.error}>{ main }</span> }
        </section>
    )
};

export default FormStatus;