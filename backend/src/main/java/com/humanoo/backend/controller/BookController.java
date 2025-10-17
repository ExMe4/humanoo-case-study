package com.humanoo.backend.controller;

import com.humanoo.backend.model.Book;
import com.humanoo.backend.model.dto.BookDTO;
import com.humanoo.backend.service.BookService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:5173") // frontend port
public class BookController {

    private final BookService service;

    public BookController(BookService service) {
        this.service = service;
    }

    @GetMapping
    public List<BookDTO> getAllBooks() {
        return service.toDTOList(service.getAllBooks());
    }

    @GetMapping("/{id}")
    public BookDTO getBookById(@PathVariable Long id) {
        return service.toDTO(service.getBookById(id));
    }

    @GetMapping("/search")
    public List<BookDTO> searchBooks(@RequestParam String query) {
        return service.toDTOList(service.searchByTitle(query));
    }

    @PostMapping
    public ResponseEntity<BookDTO> createBook(@Valid @RequestBody Book book) {
        Book created = service.createBook(book);
        return ResponseEntity.created(URI.create("/api/books/" + created.getId()))
                .body(service.toDTO(created));
    }

    @PutMapping("/{id}")
    public BookDTO updateBook(@PathVariable Long id, @Valid @RequestBody Book book) {
        Book updated = service.updateBook(id, book);
        return service.toDTO(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        service.deleteBook(id);
        return ResponseEntity.noContent().build();
    }
}

