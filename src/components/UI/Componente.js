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
  } = useInput(
    (value) => value !== '' && value > -1 && value < 200,
    props.onUpdateVotos, // Aquí va la función que actualizará el estado en el componente Formulario
    props.defaultValue // valor por defecto para enteredNumber
  );

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
        disabled={props.disabled} // Usa la prop disabled para deshabilitar el input
      />
      {numberInputHasError && (
        <div className='invalid-feedback'>Cantidad inválida.</div>
      )}
    </div>
  );
};

export default Componente;
