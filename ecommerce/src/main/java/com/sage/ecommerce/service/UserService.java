package com.sage.ecommerce.service;

import com.sage.ecommerce.domain.User;
import com.sage.ecommerce.form.SignUpForm;

public interface UserService {

    User register(SignUpForm signUpForm);

}
