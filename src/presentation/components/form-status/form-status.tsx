import React, { memo, useContext } from 'react';
import Spinner from '../spinner/spinner';
import Styles from './form-status-styles.scss';
import Context from '@/presentation/contexts/form/form-context';

const FormStatus: React.FC = () => {
    const { isLoading, errorMessage } = useContext(Context);

    return (
        <section data-testid="error-wrapper" className={Styles.errorWrapper}>
            { isLoading && <Spinner className={Styles.spinner} /> }
            { errorMessage && <span className={Styles.error}>{ errorMessage }</span> }
        </section>
    )
};

export default FormStatus;