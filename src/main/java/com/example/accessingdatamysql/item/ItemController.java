package com.example.accessingdatamysql.item;

import com.example.accessingdatamysql.myorg.OrgRosterRepository;
import com.example.accessingdatamysql.myorg.OrganizationRoster;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping(path="/item")
public class ItemController {
    @Autowired
    private OrgRosterRepository orgRosterRepository;

    @Autowired
    private CustomItemRepository customItemRepository;
    @GetMapping(path="/all")
    public @ResponseBody Map<String, Object> getItems()
    {
        Map<String, Object> response = new HashMap<>();
        response.put("data", customItemRepository.getAllItems(2));
        response.put("result", "success");
        return response;
    }

}
