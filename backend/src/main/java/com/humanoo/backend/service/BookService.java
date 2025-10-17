package com.humanoo.backend.service;

import com.humanoo.backend.exception.NotFoundException;
import com.humanoo.backend.model.Book;
import com.humanoo.backend.repository.BookRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class BookService {

    private final BookRepository repository;

    public BookService(BookRepository repository) {
        this.repository = repository;
    }

    public List<Book> getAllBooks() {
        return repository.findAll();
    }

    public Book getBookById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new NotFoundException("Book not found with id: " + id));
    }

    @Transactional
    public Book createBook(Book book) {
        book.setId(null);
        return repository.save(book);
    }

    @Transactional
    public Book updateBook(Long id, Book newBookData) {
        Book existing = getBookById(id);
        existing.setTitle(newBookData.getTitle());
        existing.setAuthor(newBookData.getAuthor());
        existing.setGenre(newBookData.getGenre());
        existing.setPublicationYear(newBookData.getPublicationYear());
        return repository.save(existing);
    }

    public void deleteBook(Long id) {
        if (!repository.existsById(id)) {
            throw new NotFoundException("Book not found with id: " + id);
        }
        repository.deleteById(id);
    }

    public List<Book> searchByTitle(String query) {
        return repository.findByTitleContainingIgnoreCase(query);
    }
}
