package com.sage.ecommerce.service;

import com.sage.ecommerce.domain.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    Product saveProduct(Product product);
    List<Product> getAllProducts();
    Optional<Product> getProductById(long id);
    List<Product> searchProductsByName(String search);

}
