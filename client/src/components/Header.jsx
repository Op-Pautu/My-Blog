import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Header() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/profile', {
      credentials: 'include',
    }).then((response) => {
      response.json().then((userInfo) => {
        setUsername(userInfo.username);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:3000/logout', {
      credentials: 'include',
      method: 'POST',
    }).then((response) => {
      if (response.ok) {
        setUsername(null);
      }
    });
  }

  return (
    <header>
      <Link to='/' className='logo'>
        My Blog
      </Link>
      {username && (
        <nav>
          <Link to='/create'>Create Post</Link>
          <a onClick={logout}>Logout</a>
        </nav>
      )}
      {!username && (
        <nav>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </nav>
      )}
    </header>
  );
}
