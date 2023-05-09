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

    @GetMapping("/admin/{id}")
    public Admin getAdminById(@PathVariable long id){
        return adminService.findById(id);
    }

    @DeleteMapping("/admin/{id}")
    public void deleteAdmin(@PathVariable long id) {
        adminService.deleteAdmin(id);
    }

    @PutMapping("/admin/{id}")
    public Admin updateAdmin(@RequestBody Admin admin, @PathVariable long id){
        Admin updateAdmin = adminService.findById(id);

        updateAdmin.setName(admin.getName());
        updateAdmin.setEmail(admin.getEmail());
        updateAdmin.setPhoneNumber(admin.getPhoneNumber());
        updateAdmin.setPassword(admin.getPassword());
        return adminService.updateAdmin(updateAdmin);
    }

    @PostMapping("/adminLogin")
    public @ResponseBody Admin login(@RequestBody LoginRequest loginRequest) {
        return adminService.login(loginRequest);
    }
}
