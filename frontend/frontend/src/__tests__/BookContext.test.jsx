import { render, waitFor } from "@testing-library/react";
import { BookProvider, BookContext } from "../context/BookContext";
import * as api from "../api/bookService";

vi.mock("../api/bookService");

const mockBooks = [
  { id: 1, title: "1984", author: "Orwell", genre: "Dystopian", publicationYear: 1949 },
];

describe("BookContext", () => {
  beforeEach(() => {
    api.getAllBooks.mockResolvedValue(mockBooks);
    api.createBook.mockReset();
  });

  it("adds a book correctly", async () => {
    const newBook = { id: 2, title: "Animal Farm", author: "Orwell", genre: "Satire", publicationYear: 1945 };
    api.createBook.mockResolvedValue(newBook);

    let contextValue;
    render(
      <BookProvider>
        <BookContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </BookContext.Consumer>
      </BookProvider>
    );

    await contextValue.addBook(newBook);

    await waitFor(() => {
      expect(contextValue.books).toContainEqual(newBook);
    });
  });
});
