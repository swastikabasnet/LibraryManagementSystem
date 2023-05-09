package com.lms.services;

import com.lms.exception.PasswordNotMatchedException;
import com.lms.exception.UserAlreadyExistException;
import com.lms.exception.UserNotFoundException;
import com.lms.model.Admin;
import com.lms.model.Borrow;
import com.lms.model.LoginRequest;
import com.lms.repository.AdminRepository;
import com.lms.repository.BorrowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    private BorrowRepository borrowRepository;

    public List<Admin> getAllAdmin() {
        List<Admin> admin = new ArrayList<>();
        adminRepository.findAll().forEach(admin::add);
        return admin;
    }

    public Admin findById(long id){
        return adminRepository.findById(id).orElseThrow(()-> new UserNotFoundException(id));
    }

    public Admin addAdmin(Admin admin) {
        Admin getAdmin = adminRepository.findByEmail((admin.getEmail()));
        if (getAdmin==null){
            return adminRepository.save(admin);
        } else {
            throw new UserAlreadyExistException();
        }
    }

    public void deleteAdmin(long id) {
        if (adminRepository.existsById(id)) {
            adminRepository.deleteById(id);
        } else {
            throw new UserNotFoundException(id);
        }
    }

    public Admin updateAdmin(Admin admin){
       return adminRepository.save(admin);
    }

    public Admin login(LoginRequest loginRequest){
        Admin admin = adminRepository.findByEmail(loginRequest.getEmail());
        System.out.println(loginRequest.getEmail() +" "+ loginRequest.getPassword());
        if (admin!=null && admin.getPassword().equals(loginRequest.getPassword())){
            return admin;
        } else {
            throw new PasswordNotMatchedException();
        }
    }


}
