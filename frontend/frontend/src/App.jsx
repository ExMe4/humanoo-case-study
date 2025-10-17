import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookList from "./pages/BookList";
import BookForm from "./pages/BookForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/books/new" element={<BookForm />} />
        <Route path="/books/:id/edit" element={<BookForm />} />
      </Routes>
    </Router>
  );
}

export default App;