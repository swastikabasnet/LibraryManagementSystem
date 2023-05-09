package com.lms.controller;

import com.lms.model.Book;
import com.lms.model.User;
import com.lms.services.BookService;
import com.lms.services.UserService;
import com.lowagie.text.DocumentException;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.lms.services.PDFGeneratorService;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
public class PDFGeneratorController {

    @Autowired
    private UserService userService;

    @Autowired
    private BookService bookService;

    @GetMapping("/pdf/users")
    public void generateUsersPDF(HttpServletResponse response) throws DocumentException, IOException {

        response.setContentType("application/pdf");
        DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        String currentDateTime = dateFormat.format(new Date());
        String headerkey = "Content-Disposition";
        String headervalue = "attachment; filename=pdf_" + currentDateTime + ".pdf";
        response.setHeader(headerkey, headervalue);

        List<User> userList = userService.getAllUsers();

        PDFGeneratorService generator = new PDFGeneratorService();
        generator.setUserList(userList);
        generator.generateUsersPDF(response);
    }

    @GetMapping("/pdf/books")
    public void generateBooksPDF(HttpServletResponse response) throws DocumentException, IOException {

        response.setContentType("application/pdf");
        DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        String currentDateTime = dateFormat.format(new Date());
        String headerkey = "Content-Disposition";
        String headervalue = "attachment; filename=pdf_" + currentDateTime + ".pdf";
        response.setHeader(headerkey, headervalue);

        List<Book> bookList = bookService.getAllBooks();

        PDFGeneratorService generator = new PDFGeneratorService();
        generator.setBookList(bookList);
        generator.generateBooksPDF(response);
    }
}
