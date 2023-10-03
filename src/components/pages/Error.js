import { useRouteError } from 'react-router-dom';

import PageContent from './PageContent';
import Navbar from '../Layout/Navbar';

function ErrorPage() {
  const error = useRouteError();

  let title = 'Ocurrió un error.';
  let message = 'Qué lástima.';

  if (error.status === 500) {
    try {
      message = JSON.parse(error.data).message;
    } catch (e) {
      console.error('Error parsing JSON:', e);
    }
  }

  if (error.status === 404) {
    try {
      title = 'No se encontró la página';
      message = JSON.parse(error.data).message;
    } catch (e) {
      console.error('Error parsing JSON:', e);
    }
  }

  return (
    <>
      <Navbar />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
