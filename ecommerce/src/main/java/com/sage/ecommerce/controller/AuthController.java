package com.sage.ecommerce.controller;

import com.sage.ecommerce.domain.User;
import com.sage.ecommerce.dto.UserDTO;
import com.sage.ecommerce.form.LoginForm;
import com.sage.ecommerce.form.SignUpForm;
import com.sage.ecommerce.jwt.JwtTokenProvider;
import com.sage.ecommerce.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody @Valid SignUpForm signUpForm) {

        System.out.println("🧪 Register controller hit");
        System.out.println(signUpForm);

        User user = userService.register(signUpForm);
        UserDTO userDTO = new UserDTO(user);

        return ResponseEntity.status(HttpStatus.CREATED).body(userDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginForm loginForm) {

        System.out.println("🧪 Login controller hit");
        System.out.println("📧 Email: " + loginForm.getEmail());
        System.out.println("🔑 Password: " + loginForm.getPassword());

        try {

            // 인증 시도
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginForm.getEmail(),
                            loginForm.getPassword()
                    )
            );

            // 인증 성공 시 JWT 토큰 생성
            String token = jwtTokenProvider.createToken(authentication);

            // 토큰 응답
            return ResponseEntity.ok().body(token);

        } catch (AuthenticationException e) {
            System.out.println("❌ Authentication failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Invalid email or password");
        }

    }

}
