package com.sage.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
public class ProductDetailDTO {

    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private String imageUrl;
    private Set<String> tags;
    private LocalDateTime createdAt;
    private List<ReviewDTO> reviews;

}
