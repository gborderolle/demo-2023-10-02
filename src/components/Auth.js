import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/auth-slice';
import { useNavigate } from 'react-router-dom';

import imageBackground from '../assets/login-background.png';
import imageLogo from '../assets/mario-logo.png';

const Auth = () => {
  const dispatch = useDispatch();
  const logout = useSelector((state) => state.logout);
  const navigate = useNavigate(); // Instancia useNavigate

  const loginHandler = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    dispatch(authActions.login());
    navigate('formulario');
  };

  return (
    <main
      style={{
        backgroundImage: `url(${imageBackground})`,
        backgroundSize: 'cover',
      }}
      className='d-flex justify-content-center align-items-center vh-100'
    >
      <section
        className='bg-light p-5 rounded text-center'
        style={{ width: '30%', backdropFilter: 'blur(10px)', minWidth: '50%' }}
      >
        <img
          src={imageLogo}
          alt='Super Mario Logo'
          className='mb-4'
          style={{ width: '100%' }}
        />{' '}
        {/* Asume un logo de Mario */}
        <form onSubmit={loginHandler} className=''>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input type='email' id='email' className='form-control' />
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input type='password' id='password' className='form-control' />
          </div>
          <button type='submit' className='btn btn-danger'>
            {' '}
            {/* Color rojo para el botón, como el color de la gorra de Mario */}
            Login
          </button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
