import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { UserContext } from '../context';
import { useRouter } from 'next/router';

export default function Nav() {
  const [current, setCurrent] = useState('');
  const [state, setState] = useContext(UserContext);

  useEffect(() => {
    // process.browser is only true is it is on the client side (next can be in client and server)
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const router = useRouter();

  const logout = () => {
    window.localStorage.removeItem('auth');
    setState(null);
    router.push('/login');
  };

  return (
    <nav
      className="nav d-flex justify-content-end"
      style={{ backgroundColor: 'blue' }}
    >
      <Link href="/">
        <a className={`nav-link text-light ${current === '/' && 'active'}`}>
          Home
        </a>
      </Link>

      {state === null ? (
        <>
          <Link href="/login">
            <a
              className={`nav-link text-light ${
                current === '/login' && 'active'
              }`}
            >
              Login
            </a>
          </Link>

          <Link href="/register">
            <a
              className={`nav-link text-light ${
                current === '/register' && 'active'
              }`}
            >
              Register
            </a>
          </Link>
        </>
      ) : (
        <>
          <Link href="/user/dashboard">
            <a
              className={`nav-link text-light ${
                current === '/user/dashboard' && 'active'
              }`}
            >
              {state && state.user && state.user.name}
            </a>
          </Link>

          <a
            onClick={logout}
            className={`nav-link text-light ${
              current === '/logout' && 'active'
            }`}
          >
            Logout
          </a>
        </>
      )}
    </nav>
  );
}
