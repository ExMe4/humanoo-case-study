import { render, screen, fireEvent } from "@testing-library/react";
import BookForm from "../pages/BookForm";
import { BookContext } from "../context/BookContext";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const addBook = vi.fn();
const editBook = vi.fn();
const getBook = vi.fn();

describe("BookForm", () => {
  it("renders input fields", () => {
    render(
      <MemoryRouter>
        <BookContext.Provider value={{ addBook, editBook, getBook }}>
          <BookForm />
        </BookContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Author")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Genre")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Year")).toBeInTheDocument();
  });

  it("calls addBook on submit when creating", () => {
    render(
      <MemoryRouter>
        <BookContext.Provider value={{ addBook, editBook, getBook }}>
          <BookForm />
        </BookContext.Provider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Title"), { target: { value: "New Book" } });
    fireEvent.change(screen.getByPlaceholderText("Author"), { target: { value: "Author" } });
    fireEvent.change(screen.getByPlaceholderText("Year"), { target: { value: 2023 } });

    fireEvent.click(screen.getByText("Create"));
    expect(addBook).toHaveBeenCalled();
  });
});