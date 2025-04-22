import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import AuthorBirthYearForm from "./components/AuthorBirthYearForm";
import { Routes, Route, Link } from "react-router-dom";

const App = () => {

  const padding = {
    padding: 5
  }

  return (
    <div>
      <div>
        <Link style={padding} to="/">Authors</Link>
        <Link style={padding} to="/books">Books</Link>
        <Link style={padding} to="/add">Add Book</Link>
        <Link style={padding} to="/updateYear">Update Author</Link>
      </div>

      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/updateYear" element={<AuthorBirthYearForm />} />
      </Routes>
    </div>
  );
};

export default App;
