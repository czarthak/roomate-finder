package com.example.accessingdatamysql.request;

import com.example.accessingdatamysql.User;
import com.example.accessingdatamysql.UserRepository;
import com.example.accessingdatamysql.auth.AuthController;
import com.example.accessingdatamysql.myorg.MyOrgRosterRepository;
import com.example.accessingdatamysql.myorg.OrganizationRoster;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.lang.ref.ReferenceQueue;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin
@RestController // This means that this class is a Controller
@RequestMapping(path="/request") // This means URL's start with /request (after Application path)
public class RequestController {

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private CustomRequestRepository customRequestRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MyOrgRosterRepository myOrgRosterRepository;

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

    @PostMapping(path = "/user/requests")
    public @ResponseBody Map<String, Object> getOrgRequest(@RequestBody Map<String, Object> json)
    {
        Map<String, Object> response = new HashMap<>();
        if (!json.containsKey("jwt") || !json.containsKey("orgId"))
        {
            response.put("result", "failure - bad request");
            return response;
        }
        Map<String, Object> map = getUserOrg(json);
        if (map.get("result").equals("success"))
        {
            Integer orgId;
            if (json.get("orgId") instanceof Integer)
                orgId = (Integer) json.get("orgId");
            else
                orgId = Integer.parseInt((String)(json.get("orgId")));
            if (map.get("type") == OrganizationRoster.Type.MEMBER)
            {
                response.put("result", "failure - not authorized members cannot view requests");
                response.put("type", map.get("type"));
                return response;
            }
            response.put("data", customRequestRepository.getRequests(orgId));
            response.put("result", "success");
            response.put("type", map.get("type"));
        }
        else
        {
            response.put("result", "failure - not authorized");
        }
        return response;
    }

    /*
       Private helper function to validate that the user is supposed to see this data
        */
    private @ResponseBody Map<String, Object> getUserOrg(Map<String, Object> json)
    {
        Map<String, Object> response = new HashMap<>();
        if (!json.containsKey("orgId") || !json.containsKey("jwt"))
        {
            response.put("result", "failed - bad request");
            return response;
        }
        User found = new User();
        AuthController au = new AuthController();
        Map<String, String> res =  au.verify(json); // if the jwt token could not be verified
        if (res.containsKey("login") && res.get("login").equals("failed"))
        {
            response.put("result", "failed = bad token or bad request");
            return response;
        }
        Optional<User> usr = userRepository.findById(res.get("user"));
        if (!usr.isPresent())
        {
            response.put("result", "failed = user not found");
            return response;
        }
        if (json.get("orgId") instanceof Integer)
            return myOrgRosterRepository.findUserOrg(usr.get().getEmail(), (Integer) json.get("orgId"));
        return myOrgRosterRepository.findUserOrg(usr.get().getEmail(),  Integer.parseInt((String) json.get("orgId")));
    }
}
