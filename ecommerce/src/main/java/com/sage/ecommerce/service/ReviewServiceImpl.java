package com.sage.ecommerce.service;

import com.sage.ecommerce.domain.Product;
import com.sage.ecommerce.domain.Review;
import com.sage.ecommerce.dto.ReviewDTO;
import com.sage.ecommerce.form.ReviewForm;
import com.sage.ecommerce.repository.ProductRepository;
import com.sage.ecommerce.repository.ReviewRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository, ProductRepository productRepository) {
        this.reviewRepository = reviewRepository;
        this.productRepository = productRepository;
    }

    @Override
    public List<ReviewDTO> getReviewsByProductId(Long productId) {
        return reviewRepository.findByProductId(productId).stream().map(review -> {

            return new ReviewDTO(
                    review.getId(),
                    review.getUsername(),
                    review.getContent(),
                    review.getRating(),
                    review.getCreatedAt()
            );

        }).collect(Collectors.toList());
    }

    @Override
    public ReviewDTO createReview(Long productId, ReviewForm reviewForm) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));

        Review review = new Review();
        review.setUsername(reviewForm.getUsername());
        review.setContent(reviewForm.getContent());
        review.setRating(reviewForm.getRating());
        review.setCreatedAt(LocalDateTime.now());
        review.setProduct(product);

        Review savedReview = reviewRepository.save(review);

        return new ReviewDTO(savedReview);
    }

    @Override
    public ReviewDTO updateReview(Long reviewId, ReviewForm reviewForm) {
        Review existingReview = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new EntityNotFoundException("Review not found"));

        existingReview.setUsername(reviewForm.getUsername());
        existingReview.setContent(reviewForm.getContent());
        existingReview.setRating(reviewForm.getRating());
        existingReview.setUpdatedAt(LocalDateTime.now());

        Review updatedReview = reviewRepository.save(existingReview);

        return  new ReviewDTO(updatedReview);

    }

    @Override
    public void deleteReview(Long reviewId) {
        if (!reviewRepository.existsById(reviewId)) {
            throw new EntityNotFoundException("Review not found");
        }
        reviewRepository.deleteById(reviewId);
    }
}
