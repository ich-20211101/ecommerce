package com.sage.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ReviewDTO {

    private Long id;
    private String username;
    private String content;
    private int rating;
    private LocalDateTime createdAt;

}
