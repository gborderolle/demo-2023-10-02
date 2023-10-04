import { v4 as uuidv4 } from 'uuid';

import ErrorMessage from '../UI/ErrorMessage';
import useInput from '../../hooks/use-input';

const Setup = (props) => {
  const {
    value: enteredName1,
    isValid: enteredNameIsValid1,
    hasError: nameInputHasError1,
    valueChangeHandler: nameInputChangeHandler1,
    inputBlurHandler: nameInputBlurHandler1,
    reset: resetNameInput1,
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredName2,
    isValid: enteredNameIsValid2,
    hasError: nameInputHasError2,
    valueChangeHandler: nameInputChangeHandler2,
    inputBlurHandler: nameInputBlurHandler2,
    reset: resetNameInput2,
  } = useInput((value) => value.trim() !== '');

  //  -------------------------------------------------

  const formSubmitHandler1 = (event) => {
    event.preventDefault();

    if (!enteredNameIsValid1) {
      return;
    }
    
    loadDummy1();
    resetNameInput1();
  };

  const nameInputClasses1 = nameInputHasError1
    ? 'form-control is-invalid'
    : 'form-control';

  const loadDummy1 = async () => {
    const newItem = {
      partyId: uuidv4(),
      partyName: enteredName1,
    };

    let id = uuidv4();
    await fetch(
      'https://react-http-23a93-default-rtdb.firebaseio.com/partyList.json',
      {
        method: 'POST',
        body: JSON.stringify({
          partyId: uuidv4(),
          partyName: enteredName1,
        }),
      }
    );
  };

  //  -------------------------------------------------

  const formSubmitHandler2 = (event) => {
    event.preventDefault();

    if (!enteredNameIsValid2) {
      return;
    }

    loadDummy2();
    resetNameInput2();
  };

  const nameInputClasses2 = nameInputHasError2
    ? 'form-control is-invalid'
    : 'form-control';

  const loadDummy2 = async () => {
    const newItem = {
      partidoId: uuidv4(),
      partidoName: enteredName2,
      partidoVotos: 0,
    };

    let id = uuidv4();
    await fetch(
      'https://react-http-23a93-default-rtdb.firebaseio.com/partidos.json',
      {
        method: 'POST',
        body: JSON.stringify({
          partidoId: uuidv4(),
          partidoName: enteredName2,
          partidoVotos: 0,
        }),
      }
    );
  };

  return (
    <>
      <div className='container mt-5' style={{ maxWidth: '500px' }}>
        <div className='card'>
          <div className='card-body'>
            <form onSubmit={formSubmitHandler1}>
              <div className='form-group d-flex align-items-center justify-content-between mb-3'>
                <label htmlFor='input' className='me-3'>
                  Partido nuevo
                </label>
                <input
                  type='text'
                  id='input'
                  className={nameInputClasses1}
                  value={enteredName1}
                  onChange={nameInputChangeHandler1}
                  onBlur={nameInputBlurHandler1}
                  style={{ maxWidth: '200px' }}
                />
              </div>
              {nameInputHasError1 && (
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
      </div>

      <div className='container mt-5' style={{ maxWidth: '500px' }}>
        <div className='card'>
          <div className='card-body'>
            <form onSubmit={formSubmitHandler2}>
              <div className='form-group d-flex align-items-center justify-content-between mb-3'>
                <label htmlFor='input' className='me-3'>
                  Lista nueva
                </label>
                <input
                  type='text'
                  id='input'
                  className={nameInputClasses2}
                  value={enteredName2}
                  onChange={nameInputChangeHandler2}
                  onBlur={nameInputBlurHandler2}
                  style={{ maxWidth: '200px' }}
                />
              </div>
              {nameInputHasError2 && (
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
      </div>
    </>
  );
};

export default Setup;
