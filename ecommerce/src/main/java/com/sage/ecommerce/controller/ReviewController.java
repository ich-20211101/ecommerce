package com.sage.ecommerce.controller;

import com.sage.ecommerce.domain.Review;
import com.sage.ecommerce.dto.ReviewDTO;
import com.sage.ecommerce.form.ReviewForm;
import com.sage.ecommerce.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/product/{productId}/reviews")
    public ResponseEntity<List<ReviewDTO>> getReviewsByProduct(@PathVariable Long productId) {
        List<ReviewDTO> reviewDTOList = reviewService.getReviewsByProductId(productId);
        return ResponseEntity.ok(reviewDTOList);
    }

    @PostMapping("/product/{productId}/reviews")
    public ResponseEntity<ReviewDTO> createReview(@PathVariable Long productId, @RequestBody ReviewForm reviewForm) {
        ReviewDTO reviewDTO = reviewService.createReview(productId, reviewForm);
        return ResponseEntity.status(HttpStatus.CREATED).body(reviewDTO);
    }

    @PutMapping("/reviews/{reviewId}")
    public ResponseEntity<ReviewDTO> updateReview(@PathVariable Long reviewId, @RequestBody ReviewForm reviewForm) {
        ReviewDTO reviewDTO = reviewService.updateReview(reviewId, reviewForm);
        return ResponseEntity.ok(reviewDTO);
    }

    @DeleteMapping("/reviews/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long reviewId) {
        reviewService.deleteReview(reviewId);
        return ResponseEntity.noContent().build();
    }

}
