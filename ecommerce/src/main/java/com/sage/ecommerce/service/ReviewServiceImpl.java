package com.sage.ecommerce.service;

import com.sage.ecommerce.domain.Product;
import com.sage.ecommerce.domain.Review;
import com.sage.ecommerce.repository.ProductRepository;
import com.sage.ecommerce.repository.ReviewRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository, ProductRepository productRepository) {
        this.reviewRepository = reviewRepository;
        this.productRepository = productRepository;
    }

    @Override
    public List<Review> getReviewsByProductId(Long productId) {
        return reviewRepository.findByProductId(productId);
    }

    @Override
    public Review createReview(Long productId, Review review) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid product ID"));

        review.setProduct(product);

        return reviewRepository.save(review);
    }

    @Override
    public Review updateReview(Long reviewId, Review updatedReview) {
        Review existingReview = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new EntityNotFoundException("Review not found"));

        existingReview.setContent(updatedReview.getContent());
        existingReview.setRating(updatedReview.getRating());
        existingReview.setUpdatedAt(LocalDateTime.now());

        return reviewRepository.save(existingReview);
    }

    @Override
    public void deleteReview(Long reviewId) {
        if (!reviewRepository.existsById(reviewId)) {
            throw new EntityNotFoundException("Review not found");
        }
        reviewRepository.deleteById(reviewId);
    }
}
