import { useEffect } from 'react';

import useInput from '../../hooks/use-input';

const Componente = (props) => {
  const {
    value: enteredNumber,
    isValid: enteredNumberIsValid,
    hasError: numberInputHasError,
    valueChangeHandler: numberInputChangeHandler,
    inputBlurHandler: numberInputBlurHandler,
    reset: resetNumberInput,
  } = useInput((value) => value < 200 && value !== '');

  useEffect(() => {
    props.onValidityChange(enteredNumberIsValid);
  }, [enteredNumberIsValid]);

  let formIsValid = false;
  if (enteredNumberIsValid) {
    formIsValid = true;
  }

  const numberInputClasses = numberInputHasError
    ? 'form-control is-invalid form-control-lg'
    : 'form-control form-control-lg';

  return (
    <div className='mb-3 form-control form-control-lg w-25'>
      <label htmlFor={props.slate} className='form-label'>
        {props.slate}
      </label>
      <input
        type='number'
        id={props.slate}
        className={numberInputClasses}
        onChange={numberInputChangeHandler}
        onBlur={numberInputBlurHandler}
        value={enteredNumber}
      />
      {numberInputHasError && (
        <div className='invalid-feedback'>Cantidad inválida.</div>
      )}
    </div>
  );
};

export default Componente;
