package com.lms.controller;

import com.lms.exception.*;
import com.lms.model.LoginRequest;
import com.lms.model.OtpRequest;
import com.lms.model.User;
import com.lms.services.EmailOtpService;
import com.lms.services.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Random;

@RestController
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private EmailOtpService emailOtpService;

    @GetMapping("/")
    public String welcome(){
        return "This is Java Backend ;)";
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public User getUserByID(@PathVariable long id) {
        return userService.getUserByID(id);
    }

    @PostMapping("/register")
    public User addUser(@RequestBody User user) {
        User getUser = userService.getUserByEmail(user.getEmail());
        if (getUser == null) {
            if (userService.getUserByPhoneNumber(user.getPhoneNumber()) != null) {
                throw new PhoneNumberAlreadyExistException();
            } else {
                return userService.addUser(user);

            }
        } else {
            throw new UserAlreadyExistException();
        }
    }

    @PutMapping("/users/{id}")
    public User updateUser(@RequestBody User user, @PathVariable long id) {
        User getUser = userService.getUserByID(id);

        getUser.setName(user.getName());
        getUser.setEmail(user.getEmail());
        getUser.setPhoneNumber(user.getPhoneNumber());
        getUser.setPassword(user.getPassword());
        getUser.setNumBookBorrowed(user.getNumBookBorrowed());
        return userService.updateUser(getUser);
    }

    @DeleteMapping("/users/{id}")
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
    int otp = 0;
    String emailOtpReset;

    @PostMapping("/users/send_otp")
    public void sendOtp(@RequestBody OtpRequest otpRequest) {
        emailOtpReset = otpRequest.getEmail();
        // Check if email exist
        if (emailOtpService.emailExist(emailOtpReset) != null) {
            // Random OTP GENERATOR
            otp = random.nextInt(900000) + 100000;
            System.out.println("Exist -> " + emailOtpReset + " " + otp);
            emailOtpService.sendMessage(emailOtpReset, "OPT verification code", String.valueOf(otp));
        } else {
            throw new EmailNotFoundException(emailOtpReset);
        }
    }

    @PostMapping("/users/verify_otp")
    public ResponseEntity<User> verifyOtp(@RequestParam("otp") int otpCode) {
        // check if email exist
        User getUser = userService.getUserByEmail(emailOtpReset);
        // check if otp matches
        if (getUser != null && otp == otpCode) {
            return new ResponseEntity<>(getUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/user/otp/reset_password")
    public void resetPasswordViaOTP(@RequestBody User user, @RequestParam("email") String email)  {
        System.out.println(email);
        User getUser = userService.getUserByEmail(email);
        getUser.setPassword(user.getPassword());
        userService.updateUser(getUser);
    }

    @PostMapping("/login")
    public @ResponseBody User login(@RequestBody LoginRequest loginRequest, HttpSession session) {
        User user = userService.getUserByEmail(loginRequest.getEmail());
        System.out.println(loginRequest.getEmail() + " " + loginRequest.getPassword());

        if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
            session.setAttribute("userId", user.getId()); // Store the user ID in the session
            return user;
        } else {
            throw new PasswordNotMatchedException();
        }
    }

}
