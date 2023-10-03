import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';
import { useNavigate } from 'react-router-dom';

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
                    <a className='nav-link text-white' href='/'>
                      Dashboard
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a className='nav-link text-white' href='/'>
                      Setup
                    </a>
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
