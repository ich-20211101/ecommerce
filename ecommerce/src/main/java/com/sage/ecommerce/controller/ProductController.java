package com.sage.ecommerce.controller;

import com.sage.ecommerce.domain.Product;
import com.sage.ecommerce.dto.ProductDetailDTO;
import com.sage.ecommerce.dto.ProductListDTO;
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
    public ResponseEntity<List<ProductListDTO>> getAllProducts() {
        List<ProductListDTO> products = productService.getAllProductDTOs();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDetailDTO> getProductById(@PathVariable Long id) {
        ProductDetailDTO product = productService.getProductDTOById(id);
        return product != null ? ResponseEntity.ok(product) : ResponseEntity.notFound().build();
    }

}
