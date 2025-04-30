package com.sage.ecommerce.service;

import com.sage.ecommerce.domain.Product;
import com.sage.ecommerce.dto.ProductDetailDTO;
import com.sage.ecommerce.dto.ProductListDTO;
import com.sage.ecommerce.dto.ReviewDTO;
import com.sage.ecommerce.repository.ProductRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public List<ProductListDTO> getAllProductDTOs() {
        return productRepository.findAll().stream().map(product -> {

            return new ProductListDTO(
                    product.getId(),
                    product.getName(),
                    product.getDescription(),
                    product.getPrice(),
                    product.getImageUrl(),
                    product.getTags(),
                    product.getReviews() != null ? product.getReviews().size() : 0
            );

        }).collect(Collectors.toList());
    }

    @Override
    public ProductDetailDTO getProductDTOById(Long id) {
        return productRepository.findById(id).map(product -> {
            List<ReviewDTO> reviewDTOList = product.getReviews().stream().map(review -> new ReviewDTO(
                    review.getId(),
                    review.getUsername(),
                    review.getContent(),
                    review.getRating(),
                    review.getCreatedAt()
            ))
                    .toList();

            return new ProductDetailDTO(
                    product.getId(),
                    product.getName(),
                    product.getDescription(),
                    product.getPrice(),
                    product.getImageUrl(),
                    product.getTags(),
                    product.getCreatedAt(),
                    reviewDTOList
            );
        })
                .orElse(null);
    }

    @Override
    public List<Product> searchProductsByName (String search) {
        return productRepository.findByNameContainingIgnoreCase(search);
    }

}
