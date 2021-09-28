import React, { useContext } from 'react'
import Context from '@/presentation/contexts/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const SubmitButton: React.FC<Props> = (props: Props) => {
  const { state } = useContext(Context)

  return (
    <button data-testid="submit" disabled={state.isFormInvalid} type="submit">
        { props.children }
    </button>
  )
}

export default SubmitButton
