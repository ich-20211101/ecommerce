package com.sage.ecommerce.controller;

import com.sage.ecommerce.domain.Review;
import com.sage.ecommerce.dto.ReviewDTO;
import com.sage.ecommerce.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/product/{productId}/reviews")
    public ResponseEntity<List<ReviewDTO>> getReviewsByProduct(@PathVariable Long productId) {
        List<ReviewDTO> reviewDTOList = reviewService.getReviewsByProductId(productId);
        return ResponseEntity.ok(reviewDTOList);
    }

    @PostMapping("/product/{productId}/reviews")
    public ResponseEntity<Review> createReview(@PathVariable Long productId, @RequestBody Review review) {
        Review savedReview = reviewService.createReview(productId, review);
        URI location = URI.create("/api/products/" + productId + "/reviews/" + savedReview.getId());
        return ResponseEntity.created(location).body(savedReview);
    }

    @PutMapping("/reviews/{reviewId}")
    public ResponseEntity<Review> updateReview(@PathVariable Long reviewId, @RequestBody Review updatedReview) {
        Review result = reviewService.updateReview(reviewId, updatedReview);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/reviews/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long reviewId) {
        reviewService.deleteReview(reviewId);
        return ResponseEntity.noContent().build();
    }

}
