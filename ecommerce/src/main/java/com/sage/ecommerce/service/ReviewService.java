package com.sage.ecommerce.service;

import com.sage.ecommerce.domain.Review;

import java.util.List;

public interface ReviewService {

    List<Review> getReviewsByProductId(Long productId);
    Review createReview(Long productId, Review review);
    Review updateReview(Long reviewId, Review review);
    void deleteReview(Long reviewId);

}
