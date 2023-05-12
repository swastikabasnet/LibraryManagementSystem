package com.lms.controller;

import com.lms.model.BookRequest;
import com.lms.services.BookRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BookRequestController {

    @Autowired
    BookRequestService bookRequestService;

    @GetMapping("/requests")
    public List<BookRequest> getAllRequests(){
        return  bookRequestService.getAllRequests();
    }

    @GetMapping("/requests/{id}")
    public BookRequest requestById(@PathVariable long id){
        return bookRequestService.requestById(id);
    }

    @PostMapping("/requests")
    public BookRequest addRequests(@RequestBody BookRequest br){
        return bookRequestService.addRequest(br);
    }

    @PutMapping("/requests/{id}")
        public BookRequest updateRequest(@RequestBody BookRequest br, @PathVariable long id, @RequestParam("admin") long adminId){
        BookRequest bookRequest = requestById(id);
        System.out.println(adminId);
        return bookRequestService.updateRequest(bookRequest, adminId);
    }

    @PutMapping("/requests_return/{id}")
        public BookRequest updateRequestReturn(@RequestBody BookRequest br, @PathVariable long id){
        BookRequest bookRequest = requestById(id);
        return bookRequestService.updateRequestReturn(bookRequest);
    }

    @DeleteMapping("/requests/{id}")
    public void deleteRequest(@PathVariable long id){
        bookRequestService.deleteRequest(id);
    }

}
