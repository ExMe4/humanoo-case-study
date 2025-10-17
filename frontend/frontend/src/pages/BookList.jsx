import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBooks, deleteBook } from "../api/bookService";

function BookList() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await getAllBooks();
      setBooks(data);
    } catch (err) {
      console.error("Failed to fetch books:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBook(id);
        setBooks(books.filter((b) => b.id !== id));
      } catch (err) {
        console.error("Failed to delete book:", err);
      }
    }
  };

  return (
    <div>
      <h1>Books</h1>
      <button onClick={() => navigate("/books/new")}>Add Book</button>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.genre}</td>
              <td>{b.publicationYear}</td>
              <td>
                <button onClick={() => navigate(`/books/${b.id}/edit`)}>Edit</button>
                <button onClick={() => handleDelete(b.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;