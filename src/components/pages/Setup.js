import { v4 as uuidv4 } from 'uuid';
import ErrorMessage from '../UI/ErrorMessage';
import useInput from '../../hooks/use-input';

const Setup = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== '');

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!enteredNameIsValid) {
      return;
    }

    loadDummy();
    resetNameInput();
  };

  const nameInputClasses = nameInputHasError
    ? 'form-control is-invalid'
    : 'form-control';

  const loadDummy = async () => {
    const newItem = {
      partidoId: uuidv4(),
      partidoName: enteredName,
      partidoVotos: 0,
    };

    let id = uuidv4();
    await fetch(
      'https://react-http-23a93-default-rtdb.firebaseio.com/partidos.json',
      {
        method: 'POST',
        body: JSON.stringify({
          partidoId: uuidv4(),
          partidoName: enteredName,
          partidoVotos: 0,
        }),
      }
    );
  };

  return (
    <div className='container mt-5' style={{ maxWidth: '500px' }}>
      <div className='card'>
        <div className='card-body'>
          <form onSubmit={formSubmitHandler}>
            <div className='form-group d-flex align-items-center justify-content-between mb-3'>
              <label htmlFor='input' className='me-3'>
                Lista
              </label>
              <input
                type='text'
                id='input'
                className={nameInputClasses}
                value={enteredName}
                onChange={nameInputChangeHandler}
                onBlur={nameInputBlurHandler}
                style={{ maxWidth: '200px' }}
              />
            </div>
            {nameInputHasError && (
              <div className='text-danger mb-3'>Cantidad inválida.</div>
            )}
            <div className='mb-3'>
              <button type='submit' className='btn btn-primary'>
                Confirmar
              </button>
            </div>
          </form>
        </div>
      </div>
      {!enteredNameIsValid && (
        <ErrorMessage errorMessage='El formulario no es válido.' />
      )}
    </div>
  );
};

export default Setup;
