package com.lms.repository;

import com.lms.model.BookRating;
import org.springframework.data.repository.CrudRepository;

public interface BookRatingRepository extends CrudRepository<BookRating, Long> {
}
