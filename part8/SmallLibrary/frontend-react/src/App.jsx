import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import AuthorBirthYearForm from "./components/AuthorBirthYearForm";
import Recommendations from "./components/Recommendations";

import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { useApolloClient } from "@apollo/client";

import LoginForm from "./components/LoginForm";
import { useEffect } from "react";

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('smallLibrary-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const padding = {
    padding: 5
  }

  return (
    <div>
      <div>
        <Link style={padding} to="/">Authors</Link>
        <Link style={padding} to="/books">Books</Link>
        {token && <Link style={padding} to="/recommendations">Recommendations</Link>}
        {token && (<Link style={padding} to="/add">Add Book</Link>)}
        {token && (<Link style={padding} to="/updateYear">Update Author</Link>)}
        {token && (<button style={padding} onClick={logout}>Logout</button>)}
        {!token && <Link style={padding} to="/login">Login</Link>}
      </div>

      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/updateYear" element={<AuthorBirthYearForm />} />
        <Route path="recommendations" element={<Recommendations />} />
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
      </Routes>
    </div>
  );
};

export default App;
