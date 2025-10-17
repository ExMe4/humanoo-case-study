import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookById, createBook, updateBook } from "../api/bookService";

function BookForm() {
  const [book, setBook] = useState({ title: "", author: "", genre: "", publicationYear: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) fetchBook(id);
  }, [id]);

  const fetchBook = async (id) => {
    setLoading(true);
    setError("");
    try {
      const data = await getBookById(id);
      setBook(data);
    } catch (err) {
      setError("Failed to fetch book details.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (id) await updateBook(id, book);
      else await createBook(book);
      navigate("/");
    } catch (err) {
      setError("Failed to save book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "2rem",
        paddingLeft: "66rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          padding: "2rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>
          {id ? "Edit Book" : "Add Book"}
        </h1>
        {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading...</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}
          >
            <input
              name="title"
              placeholder="Title"
              value={book.title}
              onChange={handleChange}
              required
              style={{ padding: "0.5rem", fontSize: "1rem", borderRadius: "4px", border: "1px solid #ccc" }}
            />
            <input
              name="author"
              placeholder="Author"
              value={book.author}
              onChange={handleChange}
              required
              style={{ padding: "0.5rem", fontSize: "1rem", borderRadius: "4px", border: "1px solid #ccc" }}
            />
            <input
              name="genre"
              placeholder="Genre"
              value={book.genre}
              onChange={handleChange}
              style={{ padding: "0.5rem", fontSize: "1rem", borderRadius: "4px", border: "1px solid #ccc" }}
            />
            <input
              name="publicationYear"
              placeholder="Year"
              type="number"
              value={book.publicationYear}
              onChange={handleChange}
              required
              style={{ padding: "0.5rem", fontSize: "1rem", borderRadius: "4px", border: "1px solid #ccc" }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "0.75rem",
                fontSize: "1rem",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {id ? "Update" : "Create"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default BookForm;