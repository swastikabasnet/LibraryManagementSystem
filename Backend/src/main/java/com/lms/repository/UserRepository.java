package com.lms.repository;

import com.lms.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

    User findByEmail(String email);

    User findByPhoneNumber(long number);
}
