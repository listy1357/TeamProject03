package com.back.back.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;

import com.back.back.entity.Products;
import com.back.back.service.ProductsService;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductsService productsService;

    // 상품 생성 또는 업데이트
    @PostMapping
    public ResponseEntity<Products> saveProduct(@RequestBody Products product) {
        Products savedProduct = productsService.saveProduct(product);
        return ResponseEntity.ok(savedProduct);
    }

    // 상품 ID로 검색
    @GetMapping("/{id}")
    public ResponseEntity<Products> getProductById(@PathVariable Long id) {
        Optional<Products> product = productsService.getProductById(id);
        return product.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 카테고리로 상품 검색
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Products>> getProductsByCategory(@PathVariable String category) {
        List<Products> products = productsService.getProductsByCategory(category);
        return ResponseEntity.ok(products);
    }

    // 상품 이름으로 검색
    @GetMapping("/search")
    public ResponseEntity<List<Products>> getProductsByName(@RequestParam String name) {
        List<Products> products = productsService.getProductsByName(name);
        return ResponseEntity.ok(products);
    }

    // 가격이 특정 값보다 큰 상품 검색
    @GetMapping("/price")
    public ResponseEntity<List<Products>> getProductsWithPriceGreaterThan(@RequestParam int price) {
        List<Products> products = productsService.getProductsWithPriceGreaterThan(price);
        return ResponseEntity.ok(products);
    }

    // 모든 상품 조회
    @GetMapping
    public ResponseEntity<List<Products>> getAllProducts() {
        List<Products> products = productsService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    // 상품 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productsService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
