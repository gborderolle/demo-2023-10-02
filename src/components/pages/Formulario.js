import { useState } from 'react';

import Componente from '../UI/Componente';
import ErrorMessage from '../UI/ErrorMessage';

const Formulario = (props) => {
  const [isValidArray, setIsValidArray] = useState([]);
  const [isValidForm, setIsValidForm] = useState(true);

  const handleValidityChange = (index, isValid) => {
    const updatedIsValidArray = [...isValidArray];
    updatedIsValidArray[index] = isValid;
    setIsValidArray(updatedIsValidArray);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const allValid = isValidArray.every(Boolean);
    if (!allValid) {
      // No todos los componentes son válidos
      setIsValidForm(false);
      return;
    }
    setIsValidForm(true);
    alert('todo ok');
    // Todos los componentes son válidos, procede con el envío del formulario
  };

  return (
    <>
      <form onSubmit={formSubmitHandler}>
        <div className='d-flex justify-content-around'>
          {['609', '5005', '90', '2121'].map((slate, index) => (
            <Componente
              key={slate}
              slate={slate}
              onValidityChange={(isValid) =>
                handleValidityChange(index, isValid)
              }
            />
          ))}
        </div>
        <div className='mb-3'>
          <button type='submit' className='btn btn-primary'>
            Confirmar
          </button>
        </div>
      </form>
      {!isValidForm && (
        <ErrorMessage errorMessage='El formulario no es válido.' />
      )}
    </>
  );
};

export default Formulario;
