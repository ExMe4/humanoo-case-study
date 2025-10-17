import React from "react";

function BookTable({ books, onEdit, onDelete }) {
  return (
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
                  onClick={() => onEdit(b.id)}
                  style={{ padding: "0.25rem 0.5rem", backgroundColor: "#ffc107", border: "none", borderRadius: "4px", cursor: "pointer" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(b.id)}
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
  );
}

export default BookTable;