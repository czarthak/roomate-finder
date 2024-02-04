package com.example.accessingdatamysql;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.Map;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import io.jsonwebtoken.Claims;
import java.nio.file.Path;

import com.example.accessingdatamysql.auth.AuthController;
import java.util.Optional;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController // This means that this class is a Controller
@RequestMapping(path = "/user") // This means URL's start with /user (after Application path)
public class MainController {
    @Autowired // This means to get the bean called userRepository
    // Which is auto-generated by Spring, we will use it to handle the data
    private UserRepository userRepository;
    private final ImageService imageService = new ImageService();

    private CustomUserRepo CustomUserRepo = new CustomUserRepo();

    @PostMapping(path = "/add") // Map ONLY POST Requests
    @ResponseBody
    public User addJsonUser(@RequestBody User usr) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        userRepository.save(usr);
        return usr;
    }

    @PutMapping(path = "/update")
    @ResponseBody
    public User updateUser(@RequestBody User usr) {
        userRepository.save(usr);
        return usr;
    }

    @PutMapping(path = "/changepass")
    @ResponseBody
    public User updateUser(@RequestBody Map<String, String> json) {
        if (json.get("email") != null) {
            Optional<User> user = userRepository.findById(json.get("email"));
            if (user.isPresent()) {
                User usr = user.get();
                usr.setPassword(json.get("password"));
                userRepository.save(usr);
                return usr;
            }
            return null;
        }
        return null;
    }

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        // This returns a JSON or XML with the users
        return userRepository.findAll();
    }

    @PostMapping(path = "/user")
    public @ResponseBody User getUser(@RequestBody Map<String, Object> json) {
        User found = new User();
        AuthController au = new AuthController();
        Map<String, String> res = au.verify(json); // if the jwt token could not be verified
        if (res.containsKey("login") && res.get("login").equals("failed")) {
            found.setEmail("failed");
            return found;
        }
        Optional<User> usr = userRepository.findById(res.get("user"));
        if (!usr.isPresent()) {
            found.setEmail("not found");
            return found;
        }
        return usr.get();
    }

    @PostMapping(path = "/delete")
    @ResponseBody
    public User deleteUser(@RequestBody Map<String, Object> json) {
        User found = new User();
        AuthController au = new AuthController();
        Map<String, String> res = au.verify(json); // if the jwt token could not be verified
        if (res.containsKey("login") && res.get("login").equals("failed")) {
            found.setEmail("failed");
            return found;
        }
        String email = res.get("user");
        Optional<User> optionalUser = userRepository.findById(email);
        if (optionalUser.isPresent()) {
            found = optionalUser.get();
            userRepository.deleteById(email);
            return found;
        }
        found.setEmail("not found");
        return found;
    }

    @PostMapping(path = "/img")
    public ResponseEntity<String> uploadImage(@RequestParam("imageFile") MultipartFile imageFile,
            @RequestParam("token") String token) {
        try {
            // Use the email to determine the correct user directory
            String userDirectory = "./imgs";
            String fileName = imageService.saveImageToStorage(userDirectory, imageFile, token);
            return ResponseEntity.ok("File uploaded successfully: " + fileName);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Failed to upload image");
        }
    }

}
