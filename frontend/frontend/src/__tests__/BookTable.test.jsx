import { render, screen, fireEvent } from "@testing-library/react";
import BookTable from "../components/BookTable";

const books = [
  { id: 1, title: "1984", author: "Orwell", genre: "Dystopian", publicationYear: 1949 },
  { id: 2, title: "Animal Farm", author: "Orwell", genre: "Political Satire", publicationYear: 1945 },
];

describe("BookTable", () => {
  it("renders all book rows", () => {
    render(<BookTable books={books} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText("1984")).toBeInTheDocument();
    expect(screen.getByText("Animal Farm")).toBeInTheDocument();
  });

  it("calls onEdit when Edit button is clicked", () => {
    const handleEdit = vi.fn();
    render(<BookTable books={books} onEdit={handleEdit} onDelete={vi.fn()} />);
    fireEvent.click(screen.getAllByText("Edit")[0]);
    expect(handleEdit).toHaveBeenCalledWith(1);
  });

  it("calls onDelete when Delete button is clicked", () => {
    const handleDelete = vi.fn();
    render(<BookTable books={books} onEdit={vi.fn()} onDelete={handleDelete} />);
    fireEvent.click(screen.getAllByText("Delete")[0]);
    expect(handleDelete).toHaveBeenCalledWith(1);
  });
});