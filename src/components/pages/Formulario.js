import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

import Componente from '../UI/Componente';
import ErrorMessage from '../UI/ErrorMessage';

const Formulario = (props) => {
  const [partidos, setPartidos] = useState([]);
  const [isValidArray, setIsValidArray] = useState([]);
  const [isValidForm, setIsValidForm] = useState(true);

  const data = useLoaderData();

  useEffect(() => {
    const loadedPartidos = [];
    for (const key in data) {
      loadedPartidos.push({
        id: key,
        name: data[key].name
      });
    }
    setPartidos(loadedPartidos);
  }, [data]);

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
          {/* {['609', '5005', '90', '2121'].map((slate, index) => ( */}
          {partidos.map((slate, index) => (
            <Componente
              key={slate.id}
              slate={slate.name}
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
}

export default Formulario;

export async function loader() {
  const response = await fetch(
    'https://react-http-23a93-default-rtdb.firebaseio.com/partidos.json',
  );

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'No se pudo obtener los datos.' }),
      { status: 500 })
  } else {
    return response;
  }
}