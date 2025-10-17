import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookById, createBook, updateBook } from "../api/bookService";

function BookForm() {
  const [book, setBook] = useState({ title: "", author: "", genre: "", publicationYear: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) fetchBook(id);
  }, [id]);

  const fetchBook = async (id) => {
    try {
      const data = await getBookById(id);
      setBook(data);
    } catch (err) {
      console.error("Failed to fetch book:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) await updateBook(id, book);
      else await createBook(book);
      navigate("/");
    } catch (err) {
      console.error("Failed to save book:", err);
    }
  };

  return (
    <div>
      <h1>{id ? "Edit Book" : "Add Book"}</h1>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={book.title} onChange={handleChange} required />
        <input name="author" placeholder="Author" value={book.author} onChange={handleChange} required />
        <input name="genre" placeholder="Genre" value={book.genre} onChange={handleChange} />
        <input
          name="publicationYear"
          placeholder="Year"
          type="number"
          value={book.publicationYear}
          onChange={handleChange}
          required
        />
        <button type="submit">{id ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}

export default BookForm;