package com.sage.ecommerce.form;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor // 기본 생성자(파라미터 없는 생성자)를 자동 생성
@AllArgsConstructor // 모든 필드를 파라미터로 받는 생성자를 자동 생성
public class ReviewForm {

    private String username;
    private String content;
    private int rating;

}
