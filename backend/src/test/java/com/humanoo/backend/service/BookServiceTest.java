package com.humanoo.backend.service;

import com.humanoo.backend.exception.NotFoundException;
import com.humanoo.backend.model.Book;
import com.humanoo.backend.repository.BookRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class BookServiceTest {

    @Mock
    private BookRepository repository;

    @InjectMocks
    private BookService service;

    private Book sampleBook;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        sampleBook = new Book("1984", "George Orwell", "Dystopian", 1949);
        sampleBook.setId(1L);
    }

    @Test
    void getAllBooks_shouldReturnListOfBooks() {
        // Given
        when(repository.findAll()).thenReturn(List.of(sampleBook));

        // When
        List<Book> result = service.getAllBooks();

        // Then
        assertThat(result).hasSize(1);
        assertThat(result.get(0).getTitle()).isEqualTo("1984");
        verify(repository).findAll();
    }

    @Test
    void getBookById_shouldReturnBook_whenFound() {
        // Given
        when(repository.findById(1L)).thenReturn(Optional.of(sampleBook));

        // When
        Book result = service.getBookById(1L);

        // Then
        assertThat(result).isEqualTo(sampleBook);
        verify(repository).findById(1L);
    }

    @Test
    void getBookById_shouldThrow_whenNotFound() {
        // Given
        when(repository.findById(99L)).thenReturn(Optional.empty());

        // When & Then
        assertThatThrownBy(() -> service.getBookById(99L))
                .isInstanceOf(NotFoundException.class)
                .hasMessageContaining("Book not found with id: 99");
    }

    @Test
    void createBook_shouldSaveBook() {
        // Given
        Book newBook = new Book("New Book", "Author", "Genre", 2020);
        when(repository.save(any(Book.class))).thenAnswer(invocation -> {
            Book saved = invocation.getArgument(0);
            saved.setId(2L);
            return saved;
        });

        // When
        Book result = service.createBook(newBook);

        // Then
        assertThat(result.getId()).isEqualTo(2L);
        verify(repository).save(any(Book.class));
    }

    @Test
    void updateBook_shouldModifyAndSaveExistingBook() {
        // Given
        when(repository.findById(1L)).thenReturn(Optional.of(sampleBook));
        when(repository.save(any(Book.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Book updatedData = new Book("Animal Farm", "George Orwell", "Political satire", 1945);

        // When
        Book result = service.updateBook(1L, updatedData);

        // Then
        assertThat(result.getTitle()).isEqualTo("Animal Farm");
        assertThat(result.getPublicationYear()).isEqualTo(1945);
        verify(repository).save(sampleBook);
    }

    @Test
    void updateBook_shouldThrow_whenNotFound() {
        // Given
        when(repository.findById(99L)).thenReturn(Optional.empty());
        Book update = new Book("Title", "Author", "Genre", 2000);

        // When & Then
        assertThatThrownBy(() -> service.updateBook(99L, update))
                .isInstanceOf(NotFoundException.class);
    }

    @Test
    void deleteBook_shouldDelete_whenExists() {
        // Given
        when(repository.existsById(1L)).thenReturn(true);

        // When
        service.deleteBook(1L);

        // Then
        verify(repository).deleteById(1L);
    }

    @Test
    void deleteBook_shouldThrow_whenNotFound() {
        // Given
        when(repository.existsById(1L)).thenReturn(false);

        // When & Then
        assertThatThrownBy(() -> service.deleteBook(1L))
                .isInstanceOf(NotFoundException.class);
        verify(repository, never()).deleteById(any());
    }

    @Test
    void searchByTitle_shouldReturnMatchingBooks() {
        // Given
        when(repository.findByTitleContainingIgnoreCase("1984"))
                .thenReturn(List.of(sampleBook));

        // When
        List<Book> result = service.searchByTitle("1984");

        // Then
        assertThat(result).containsExactly(sampleBook);
        verify(repository).findByTitleContainingIgnoreCase("1984");
    }
}
