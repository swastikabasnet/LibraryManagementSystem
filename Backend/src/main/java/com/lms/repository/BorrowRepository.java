package com.lms.repository;

import com.lms.model.Borrow;
import com.lms.model.BorrowStatus;
import org.springframework.data.repository.CrudRepository;
import java.util.List;
import java.util.Arrays;


public interface BorrowRepository extends CrudRepository<Borrow, Long> {

    List<Borrow> findByUserId(Long userID);
    List<Borrow> findByBookId(Long bookId);
    List<Borrow> findByUserIdAndStatusIn(Long userId, List<BorrowStatus> status);


}
