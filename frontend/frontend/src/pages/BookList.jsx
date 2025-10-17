import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BookContext } from "../context/BookContext";
import BookTable from "../components/BookTable";

function BookList() {
  const { books, loading, error, fetchBooks, removeBook } = useContext(BookContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleEdit = (id) => {
      navigate(`/books/${id}/edit`);
    };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      removeBook(id);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [location.pathname]);

  return (
    <div
      style={{
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "2rem",
        paddingLeft: "60rem",
      }}
    >
      <div style={{ maxWidth: "900px", width: "100%", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1 style={{ textAlign: "center", marginBottom: "5rem" }}>Book Library</h1>
        {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}
        <button
          onClick={() => navigate("/books/new")}
          style={{
            padding: "0.5rem 1rem",
            marginBottom: "1rem",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Book
        </button>
        {loading ? <p>Loading books...</p> : <BookTable books={books} onEdit={handleEdit} onDelete={handleDelete} />}
      </div>
    </div>
  );
}

export default BookList;