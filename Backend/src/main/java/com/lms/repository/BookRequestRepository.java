package com.lms.repository;

import com.lms.model.BookRequest;
import org.springframework.data.repository.CrudRepository;

public interface BookRequestRepository extends CrudRepository<BookRequest, Long> {
}
