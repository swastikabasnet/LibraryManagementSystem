package com.lms.services;

import com.lms.model.Admin;
import com.lms.model.BookRequest;
import com.lms.model.BorrowStatus;
import com.lms.repository.BookRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookRequestService {

    @Autowired
    BookRequestRepository bookRequestRepository;

    public List<BookRequest> getAllRequests(){
        List<BookRequest> br = new ArrayList<>();
        bookRequestRepository.findAll().forEach(br::add);
        return br;
    }

    public BookRequest addRequest(BookRequest br){
        br.setStatus(BorrowStatus.REQUESTED);
        return bookRequestRepository.save(br);
    }

    public BookRequest requestById(long id){
        return bookRequestRepository.findById(id).orElseThrow();
    }

    public BookRequest updateRequest(BookRequest br, long adminId){
        // get existing book request
        BookRequest existingRequest = requestById(br.getId());

        // set book returned status
        existingRequest.setStatus(BorrowStatus.RETURNED);
        existingRequest.setBook(br.getBook());
        existingRequest.setUser(br.getUser());

        Admin admin = new Admin();
        admin.setId(adminId);
        existingRequest.setAdmin(admin);
        // save edited data
        bookRequestRepository.save(existingRequest);

        return existingRequest;
    }

    public BookRequest updateRequestReturn(BookRequest br){
        // get existing book request
        BookRequest existingRequest = requestById(br.getId());

        // set book returned status
        existingRequest.setStatus(BorrowStatus.RETURNED);
        existingRequest.setBook(br.getBook());
        existingRequest.setUser(br.getUser());
        existingRequest.setAdmin(br.getAdmin());
        // save edited data
        bookRequestRepository.save(existingRequest);

        return existingRequest;
    }

    public void deleteRequest(long id){
        bookRequestRepository.deleteById(id);
    }
}
