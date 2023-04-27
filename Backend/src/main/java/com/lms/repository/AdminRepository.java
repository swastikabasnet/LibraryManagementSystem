package com.lms.repository;

import com.lms.model.Admin;
import com.lms.model.User;
import org.springframework.data.repository.CrudRepository;

public interface AdminRepository extends CrudRepository<Admin, Long> {
    Admin findByEmail(String email);
}

