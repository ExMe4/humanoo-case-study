import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBooks, deleteBook } from "../api/bookService";

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAllBooks();
      setBooks(data);
    } catch (err) {
      setError("Failed to fetch books.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBook(id);
        setBooks(books.filter((b) => b.id !== id));
      } catch (err) {
        setError("Failed to delete book.");
      }
    }
  };

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
        <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>Book Library</h1>
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
        {loading ? (
          <p>Loading books...</p>
        ) : (
          <div style={{ overflowX: "auto", display: "flex", justifyContent: "center", width: "100%" }}>
            <table style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Title</th>
                  <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Author</th>
                  <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Genre</th>
                  <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Year</th>
                  <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((b) => (
                  <tr key={b.id}>
                    <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{b.title}</td>
                    <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{b.author}</td>
                    <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{b.genre}</td>
                    <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{b.publicationYear}</td>
                    <td style={{ border: "1px solid #ccc", padding: "0.5rem", display: "flex", gap: "0.5rem" }}>
                      <button
                        onClick={() => navigate(`/books/${b.id}/edit`)}
                        style={{ padding: "0.25rem 0.5rem", backgroundColor: "#ffc107", border: "none", borderRadius: "4px", cursor: "pointer" }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(b.id)}
                        style={{ padding: "0.25rem 0.5rem", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookList;