import { createContext, useState, useEffect } from "react";
import { getAllBooks, getBookById, createBook, updateBook, deleteBook } from "../api/bookService";

export const BookContext = createContext();

export function BookProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all books on mount
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAllBooks();
      setBooks(data);
    } catch {
      setError("Failed to fetch books.");
    } finally {
      setLoading(false);
    }
  };

  const getBook = async (id) => {
    try {
      return await getBookById(id);
    } catch {
      throw new Error("Failed to fetch book");
    }
  };

  const addBook = async (book) => {
    try {
      const newBook = await createBook(book);
      setBooks((prev) => [...prev, newBook]);
    } catch {
      throw new Error("Failed to add book");
    }
  };

  const editBook = async (id, updatedBook) => {
    try {
      const updated = await updateBook(id, updatedBook);
      setBooks((prev) =>
        prev.map((b) => (b.id === id ? updated : b))
      );
    } catch {
      throw new Error("Failed to update book");
    }
  };

  const removeBook = async (id) => {
    try {
      await deleteBook(id);
      setBooks((prev) => prev.filter((b) => b.id !== id));
    } catch {
      throw new Error("Failed to delete book");
    }
  };

  return (
    <BookContext.Provider value={{ books, loading, error, fetchBooks, getBook, addBook, editBook, removeBook }}>
      {children}
    </BookContext.Provider>
  );
}