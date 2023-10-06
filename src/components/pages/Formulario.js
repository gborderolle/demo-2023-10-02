// Importa las funciones necesarias de Firebase
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, remove } from 'firebase/database';
import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

import Componente from '../UI/Componente';
import ErrorMessage from '../UI/ErrorMessage';

// Configura Firebase con tus credenciales
const firebaseConfig = {
  apiKey:
    'BPw3lu8w3TluM7hIMrXwF-7K_LXaFpt1SkjCpdRGz44_f3k71tHtJCKzbJUzyu8ywDcIhlM1_rctbVL5W1Cunls',
  authDomain: 'tu-auth-domain',
  databaseURL: 'https://react-http-23a93-default-rtdb.firebaseio.com',
  projectId: 'react-http-23a93',
  storageBucket: 'tu-storage-bucket',
  messagingSenderId: 'tu-messaging-sender-id',
  appId: 'react-http',
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Define la función para vaciar los partidos en Firebase
const clearSlatesInFirebase = async () => {
  try {
    await remove(ref(database, 'slateList'));
  } catch (error) {
  }
};

const Formulario = (props) => {
  const [slates, setSlates] = useState([]);
  const [isValidArray, setIsValidArray] = useState([]);
  const [isValidForm, setIsValidForm] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);

  const totalVotos = slates.reduce(
    (total, slate) => total + Number(slate.slateVotes),
    0
  );

  const data = useLoaderData();
  useEffect(() => {
    const loadedSlates = [];
    for (const key in data) {
      loadedSlates.push({
        slateId: data[key].slateId,
        slateName: data[key].slateName,
        slateVotes: data[key].slateVotes,
      });
    }
    setSlates(loadedSlates);
  }, [data]);

  const validityHandler = (index, isValid) => {
    const updatedIsValidArray = [...isValidArray];
    updatedIsValidArray[index] = isValid;
    setIsValidArray(updatedIsValidArray);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const allValid = isValidArray.every(Boolean);
    if (!allValid) {
      setIsValidForm(false);
      return;
    }
    setIsValidForm(true);
    setIsDisabled(true); // Deshabilita los campos si el formulario es válido
    pushForm();
  };

  const pushForm = async () => {
    await clearSlatesInFirebase();

    slates.forEach(async (slate) => {
      try {
        await fetch(
          'https://react-http-23a93-default-rtdb.firebaseio.com/slateList.json',
          {
            method: 'POST',
            body: JSON.stringify({
              slateId: slate.slateId,
              slateName: slate.slateName,
              slateVotes: slate.slateVotes,
            }),
          }
        );
      } catch (error) {
        console.error('Error al enviar datos:', error);
      }
    });
  };

  const updateVotosHandler = (slateId, newVotos) => {
    setSlates((prevSlates) =>
      prevSlates.map((slate) =>
        slate.slateId === slateId
          ? { ...slate, slateVotes: newVotos }
          : slate
      )
    );
  };

  const editHandler = () => {
    setIsDisabled(false); // Habilita los campos cuando se hace clic en Editar
  };

  return (
    <>
      <form onSubmit={formSubmitHandler}>
        <div className='d-flex justify-content-around'>
          {slates.map((slate, index) => (
            <Componente
              key={slate.slateId}
              slate={slate.slateName}
              defaultValue={slate.slateVotes}
              onValidityChange={(isValid) => validityHandler(index, isValid)}
              onUpdateVotos={(newVotos) =>
                updateVotosHandler(slate.slateId, newVotos)
              }
              disabled={isDisabled} // Pasa la prop disabled a Componente
            />
          ))}
        </div>
        <div className='mb-3'>
          <button type='submit' className='btn btn-primary'>
            Confirmar
          </button>
          <button
            type='button'
            className='btn btn-secondary'
            onClick={editHandler}
          >
            Editar
          </button>
        </div>
        <div className='mb-3'>
          <label>Total de votos: {totalVotos}</label>
        </div>
      </form>
      {!isValidForm && (
        <ErrorMessage errorMessage='El formulario no es válido.' />
      )}
    </>
  );
};

export default Formulario;

export async function loader() {
  const response = await fetch(
    'https://react-http-23a93-default-rtdb.firebaseio.com/slateList.json'
  );

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: 'No se pudo obtener los datos.' }),
      { status: 500 }
    );
  } else {
    return response;
  }
}
