import { useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Auth from './components/Auth';
import RootLayout from './components/Layout/Root';
import ContenedorLayout from './components/Layout/Contenedor';
import FormularioPage from './components/pages/Formulario';

import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    //  errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Auth /> },
      {
        path: '/',
        element: <ContenedorLayout title='Formulario' subtitle='' />,
        children: [
          { path: 'formulario', element: <FormularioPage /> },
          // { path: '', element: <EventsPage />, loader: eventsLoader },
          // { path: ':eventId', element: <EventDetailPage /> },
          // { path: ':eventId/edit', element: <EditEventPage /> },
        ],
      },
    ],
  },
]);

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return <RouterProvider router={router} />;
}

export default App;
