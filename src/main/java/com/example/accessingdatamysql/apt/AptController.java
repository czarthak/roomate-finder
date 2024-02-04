package com.example.accessingdatamysql.apt;
import com.example.accessingdatamysql.myorg.OrgRosterRepository;
import com.example.accessingdatamysql.myorg.OrganizationRoster;
import com.example.accessingdatamysql.org.Organization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController // This means that this class is a Controller
@RequestMapping(path="/apt") // This means URL's start with /demo (after Application path)
public class AptController {

    @Autowired
    private CustomAptRepository customAptRepository;

    @PostMapping(path="/user/desc")
    public @ResponseBody Map<String, Object> getUserDesc(@RequestBody Map<String, Object> json)
    {
        // This returns a JSON or XML with the users
        Map<String, Object> response = new HashMap<>();
        if (!json.containsKey("email"))
        {
            response.put("result", "failure - bad request");
            return response;
        }
        response.put("result", "success");
        response.put("descriptions" , customAptRepository.getAptDescriptions((String) json.get("email")));
        return response;
    }
}
