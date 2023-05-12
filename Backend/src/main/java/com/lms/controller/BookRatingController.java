package com.lms.controller;

import com.lms.model.BookRating;
import com.lms.services.BookRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BookRatingController {

    @Autowired
    BookRatingService bookRatingService;

    @GetMapping("/ratings")
    public List<BookRating> getAllRatings(){
        return bookRatingService.findAllRating();
    }

    @GetMapping("/ratings/{id}")
    public BookRating findById(@PathVariable long id){
        return bookRatingService.findById(id);
    }

    @PostMapping("/ratings")
    public BookRating addRating(@RequestBody BookRating bookRating) {
        return bookRatingService.addRating(bookRating);
    }

    @PutMapping("/ratings/{id}")
    public BookRating updateRating(@PathVariable long id, @RequestBody BookRating bookRating) {
        // Set the ID of the BookRating object to update
        bookRating.setId(id);

        // Update the BookRating object
        return  bookRatingService.updateRating(bookRating);
    }

    @DeleteMapping("/ratings/{id}")
    public void deleteRating(@PathVariable long id){
        bookRatingService.deleteRating(id);
    }
}
