package com.example.accessingdatamysql.request;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.lang.ref.ReferenceQueue;

@CrossOrigin
@RestController // This means that this class is a Controller
@RequestMapping(path="/request") // This means URL's start with /request (after Application path)
public class RequestController {

    @Autowired
    private RequestRepository requestRepository;

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Request> getAll()
    {
        return requestRepository.findAll();
    }

    @GetMapping(path="/random")
    public @ResponseBody Request getOne()
    {
        return requestRepository.findById(1).get();
    }

}
