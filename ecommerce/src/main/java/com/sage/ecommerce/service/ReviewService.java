package com.sage.ecommerce.service;

import com.sage.ecommerce.domain.Review;
import com.sage.ecommerce.dto.ReviewDTO;

import java.util.List;

public interface ReviewService {

    List<ReviewDTO> getReviewsByProductId(Long productId);
    Review createReview(Long productId, Review review);
    Review updateReview(Long reviewId, Review review);
    void deleteReview(Long reviewId);

}
