import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate(); // Instancia useNavigate

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate('/');
  };

  return (
    <header className='bg-dark py-3'>
      <div className='container'>
        <div className='d-flex justify-content-between align-items-center'>
          <h1 className='text-white'>Demo 2023-10-02</h1>
          <nav>
            <ul className='nav'>
              {isLoggedIn && (
                <>
                  <li className='nav-item'>
                    <Link className='nav-link text-white' to='formulario'>
                      Formulario
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link text-white' to='setup'>
                      Setup
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <button
                      className='btn btn-outline-light'
                      onClick={logoutHandler}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
