import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await fetch("http://localhost:3000/profile", {
          credentials: "include",
        });
        console.log(response);
        const userInfo = await response.json();
        setUserInfo(userInfo);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserInfo();
  }, []);

  async function logout() {
    try {
      await fetch("http://localhost:3000/logout", {
        credentials: "include",
        method: "POST",
      });
      setUserInfo(null);
    } catch (error) {
      console.error(error);
    }
  }

  const username = userInfo?.username;
  return (
    <header>
      <Link to="/" className="logo">
        My Blog
      </Link>
      {username && (
        <nav>
          <Link to="/create">Create Post</Link>
          <a onClick={logout}>Logout</a>
        </nav>
      )}
      {!username && (
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      )}
    </header>
  );
}
