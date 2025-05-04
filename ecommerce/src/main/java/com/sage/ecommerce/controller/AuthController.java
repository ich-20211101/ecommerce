package com.sage.ecommerce.controller;

import com.sage.ecommerce.domain.User;
import com.sage.ecommerce.dto.UserDTO;
import com.sage.ecommerce.form.SignUpForm;
import com.sage.ecommerce.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody @Valid SignUpForm signUpForm) {
        User user = userService.register(signUpForm);
        UserDTO userDTO = new UserDTO(user);

        return ResponseEntity.status(HttpStatus.CREATED).body(userDTO);
    }

}
