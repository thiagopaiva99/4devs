import React, { memo, useContext } from 'react';
import Spinner from '../spinner/spinner';
import Styles from './form-status-styles.scss';
import Context from '@/presentation/contexts/form/form-context';

const FormStatus: React.FC = () => {
    const { state } = useContext(Context);
    const { isLoading, mainError } = state;
    
    return (
        <section data-testid="error-wrapper" className={Styles.errorWrapper}>
            { isLoading && <Spinner className={Styles.spinner} /> }
            { mainError && <span data-testid="main-error" className={Styles.error}>{ mainError }</span> }
        </section>
    )
};

export default FormStatus;