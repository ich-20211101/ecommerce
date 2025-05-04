package com.sage.ecommerce.dto;

import com.sage.ecommerce.domain.Review;
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

    public ReviewDTO(Review review) {
        this.id = review.getId();
        this.username = review.getUsername();
        this.content = review.getContent();
        this.rating = review.getRating();
        this.createdAt = review.getCreatedAt();
    }

}
