import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BookProvider } from "./context/BookContext";
import ErrorBoundary from "./components/ErrorBoundary";
import React, { Suspense, lazy } from "react";

const BookList = lazy(() => import("./pages/BookList"));
const BookForm = lazy(() => import("./pages/BookForm"));

function App() {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <BookProvider>
          <Router>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<BookList />} />
                <Route path="/books/new" element={<BookForm />} />
                <Route path="/books/:id/edit" element={<BookForm />} />
                <Route path="*" element={<h1>404 - Page Not Found</h1>} />
              </Routes>
            </Suspense>
          </Router>
        </BookProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}

export default App;