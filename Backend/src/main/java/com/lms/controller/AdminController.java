package com.lms.controller;

import com.lms.model.Admin;
import com.lms.model.LoginRequest;
import com.lms.repository.AdminRepository;
import com.lms.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/admin")
    public List<Admin> getAllAdmin() {
        return adminService.getAllAdmin();
    }

    @PostMapping("/admin")
    public Admin addAdmin(@RequestBody Admin admin) {
        return adminService.addAdmin(admin);
    }

    @DeleteMapping("/admin/{id}")
    public void deleteAdmin(@PathVariable long id) {
        adminService.deleteAdmin(id);
    }

    @PostMapping("/adminLogin")
    public @ResponseBody Admin login(@RequestBody LoginRequest loginRequest) {
        return adminService.login(loginRequest);
    }

}
