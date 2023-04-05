package com.lms.controller;


import com.lms.exception.EmailNotFoundException;
import com.lms.exception.PasswordNotMatchedException;
import com.lms.exception.UserAlreadyExistException;
import com.lms.exception.UserNotFoundException;
import com.lms.model.LoginRequest;
import com.lms.model.User;
import com.lms.services.EmailOtpService;
import com.lms.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Random;

@RestController
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private EmailOtpService emailOtpService;



    @GetMapping("/Users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/Users/{id}")
    public User getUserByID(@PathVariable long id) {
        return userService.getUserByID(id);
    }

    @PostMapping("/register")
    public User addUser(@RequestBody User user) {
        User getUser = userService.getUserByEmail(user.getEmail());
        if (getUser==null){
            user.setRole("Member");
           return userService.addUser(user);
        } else {
            throw new UserAlreadyExistException();
        }
    }

    @PutMapping("/Users/{id}")
    public User updateUser(@RequestBody User user, @PathVariable long id) {
        User getUser = userService.getUserByID(id);

        getUser.setName(user.getName());
        getUser.setEmail(user.getEmail());
        getUser.setPhoneNumber(user.getPhoneNumber());
        getUser.setPassword(user.getPassword());
        return userService.updateUser(getUser);
    }

    @DeleteMapping("/Users/{id}")
    public void deleteUser(@PathVariable long id) {
        User user = userService.getUserByID(id);
        if (user.getId() == id) {
            userService.deleteUser(id);
        } else {
            throw new UserNotFoundException(id);
        }
    }
    // for generating random otp of 6 digits
    Random random = new Random();
    int otp;
    String emailOtpReset;
    @PostMapping("/Users/send_otp")
    public void sendOtp(@RequestParam("email") String email) {
        emailOtpReset = email;
        // Check if email exist
        if (emailOtpService.emailExist(email) != null) {
            // Random OTP GENERATOR
            otp = random.nextInt(900000) + 100000;
            System.out.println("Exist -> " + email + " " + otp);
            emailOtpService.sendMessage(email, "OPT verification code", String.valueOf(otp));
        } else {
            throw new EmailNotFoundException(email);
        }
    }

    @PutMapping("/Users/reset_password/otp")
    public User resetPasswordViaOTP(@RequestBody User user, @RequestParam("otp") int otpCode) {
        // check if email exist
        User getUser = userService.getUserByEmail(emailOtpReset);
        // check if otp matches
        if (getUser != null){
            if (otp == otpCode) {
                getUser.setPassword(user.getPassword());
                System.out.println("Password changed");
                return userService.updateUser(getUser);
            }
        }
         else {
            throw new EmailNotFoundException(user.getEmail());
        }
        return getUser;
    }

    @PostMapping("/login")
    public @ResponseBody User login(@RequestBody LoginRequest loginRequest){
        User user = userService.getUserByEmail(loginRequest.getEmail());
        System.out.println(loginRequest.getEmail() +" "+ loginRequest.getPassword());

        if (user!=null && user.getPassword().equals(loginRequest.getPassword())){
            return user;
        } else {
            throw new PasswordNotMatchedException();
        }
    }
}
