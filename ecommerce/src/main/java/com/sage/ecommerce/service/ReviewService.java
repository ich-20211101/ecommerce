package com.sage.ecommerce.service;

import com.sage.ecommerce.domain.Review;
import com.sage.ecommerce.dto.ReviewDTO;
import com.sage.ecommerce.form.ReviewForm;

import java.util.List;

public interface ReviewService {

    List<ReviewDTO> getReviewsByProductId(Long productId);
    ReviewDTO createReview(Long productId, ReviewForm reviewForm);
    ReviewDTO updateReview(Long reviewId, ReviewForm reviewForm);
    void deleteReview(Long reviewId);

}
