package com.humanoo.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.humanoo.backend.model.Book;
import com.humanoo.backend.model.dto.BookDTO;
import com.humanoo.backend.service.BookService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDate;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class BookControllerTest {

    @Mock
    private BookService service;

    @InjectMocks
    private BookController controller;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;
    private Book sampleBook;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
        objectMapper = new ObjectMapper();
        sampleBook = new Book("1984", "George Orwell", "Dystopian", 1949);
        sampleBook.setId(1L);
    }

    @Test
    void getAllBooks_shouldReturnList() throws Exception {
        BookDTO dto = new BookDTO(1L, "1984", "George Orwell", "Dystopian", 1949, LocalDate.now());
        when(service.getAllBooks()).thenReturn(List.of(sampleBook));
        when(service.toDTOList(anyList())).thenReturn(List.of(dto));

        mockMvc.perform(get("/api/books"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("1984"));
    }

    @Test
    void getBookById_shouldReturnBook() throws Exception {
        BookDTO dto = new BookDTO(1L, "1984", "George Orwell", "Dystopian", 1949, LocalDate.now());
        when(service.getBookById(1L)).thenReturn(sampleBook);
        when(service.toDTO(any(Book.class))).thenReturn(dto);

        mockMvc.perform(get("/api/books/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.author").value("George Orwell"));
    }


    @Test
    void deleteBook_shouldReturnNoContent() throws Exception {
        // Given
        doNothing().when(service).deleteBook(1L);

        // When & Then
        mockMvc.perform(delete("/api/books/1"))
                .andExpect(status().isNoContent());

        verify(service).deleteBook(1L);
    }
}