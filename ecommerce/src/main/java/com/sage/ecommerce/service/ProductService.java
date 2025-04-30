package com.sage.ecommerce.service;

import com.sage.ecommerce.domain.Product;
import com.sage.ecommerce.dto.ProductDetailDTO;
import com.sage.ecommerce.dto.ProductListDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    Product saveProduct(Product product);
    List<ProductListDTO> getAllProductDTOs();
    ProductDetailDTO getProductDTOById(Long id);
    List<Product> searchProductsByName(String search);

}
