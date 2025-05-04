package com.sage.ecommerce.service;

import com.sage.ecommerce.domain.User;
import com.sage.ecommerce.form.SignUpForm;
import com.sage.ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import org.springframework.security.crypto.password.PasswordEncoder;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User register(SignUpForm signUpForm) {

        if (userRepository.existsByEmail(signUpForm.getEmail())) {
            throw new IllegalArgumentException("Email address already in use");
        }

        String encodedPassword = passwordEncoder.encode(signUpForm.getPassword());

        User user = User.builder()
                .email(signUpForm.getEmail())
                .password(encodedPassword)
                .firstName(signUpForm.getFirstName())
                .lastName(signUpForm.getLastName())
                .authProvider(signUpForm.getAuthProvider())
                .role(signUpForm.getRole())
                .build();

        return userRepository.save(user);
    }
}
