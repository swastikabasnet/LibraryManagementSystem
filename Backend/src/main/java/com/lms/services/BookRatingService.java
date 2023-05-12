package com.lms.services;

import com.lms.model.Book;
import com.lms.model.BookRating;
import com.lms.repository.BookRatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookRatingService {

    @Autowired
    BookRatingRepository bookRatingRepository;

    public List<BookRating> findAllRating(){
        List<BookRating> allRatings = new ArrayList<>();
        bookRatingRepository.findAll().forEach(allRatings::add);
        return allRatings;
    }

    public BookRating findById(long id){
        return bookRatingRepository.findById(id).orElseThrow();
    }

    public BookRating addRating(BookRating bookRating){
        return bookRatingRepository.save(bookRating);
    }

    public BookRating updateRating(BookRating bookRating) {
        // Get the existing BookRating object from the database using its ID
        BookRating existingRating = bookRatingRepository.findById(bookRating.getId()).orElseThrow();

        // Update existing BookRating object with the values from the new BookRating object
        existingRating.setRating(bookRating.getRating());
        existingRating.setReview(bookRating.getReview());
        existingRating.setUser(bookRating.getUser());
        existingRating.setBook(bookRating.getBook());

        // Save the updated BookRating object to the database
        bookRatingRepository.save(existingRating);

        // Return the updated BookRating object
        return existingRating;
    }

    public void deleteRating(long id){
        bookRatingRepository.deleteById(id);
    }
}
