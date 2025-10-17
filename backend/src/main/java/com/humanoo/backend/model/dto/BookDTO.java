package com.humanoo.backend.model.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookDTO {
    private Long id;
    private String title;
    private String author;
    private String genre;
    private Integer publicationYear;
    private LocalDate addedDate;
}