package com.humanoo.backend.service;

import com.humanoo.backend.exception.NotFoundException;
import com.humanoo.backend.model.Book;
import com.humanoo.backend.model.dto.BookDTO;
import com.humanoo.backend.repository.BookRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class BookService {

    private static final Logger logger = LoggerFactory.getLogger(BookService.class);

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
        Book created = repository.save(book);
        logger.info("Created book with id {} and title '{}'", created.getId(), created.getTitle());
        return created;
    }

    @Transactional
    public Book updateBook(Long id, Book newBookData) {
        Book existing = getBookById(id);
        existing.setTitle(newBookData.getTitle());
        existing.setAuthor(newBookData.getAuthor());
        existing.setGenre(newBookData.getGenre());
        existing.setPublicationYear(newBookData.getPublicationYear());
        Book updated = repository.save(existing);
        logger.info("Updated book with id {}: '{}'", updated.getId(), updated.getTitle());
        return updated;
    }

    public void deleteBook(Long id) {
        if (!repository.existsById(id)) {
            throw new NotFoundException("Book not found with id: " + id);
        }
        repository.deleteById(id);
        logger.info("Deleted book with id {}", id);
    }

    public List<Book> searchByTitle(String query) {
        return repository.findByTitleContainingIgnoreCase(query);
    }

    public BookDTO toDTO(Book book) {
        return BookDTO.builder()
                .id(book.getId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .genre(book.getGenre())
                .publicationYear(book.getPublicationYear())
                .addedDate(book.getAddedDate())
                .build();
    }

    public List<BookDTO> toDTOList(List<Book> books) {
        return books.stream().map(this::toDTO).toList();
    }
}
