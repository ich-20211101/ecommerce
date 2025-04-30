package com.sage.ecommerce.controller;

import com.sage.ecommerce.domain.Product;
import com.sage.ecommerce.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product savedProduct = productService.saveProduct(product);
        URI location = URI.create("/api/products/" + savedProduct.getId());
        return ResponseEntity.created(location).body(savedProduct);
    }

    @GetMapping
    public List<Product> getProducts(@RequestParam(required = false) String search) {

        if (search != null && !search.isEmpty()) {
            return productService.searchProductsByName(search);
        } else {
            return productService.getAllProducts();
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Optional<Product> product = productService.getProductById(id);
        return product.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
