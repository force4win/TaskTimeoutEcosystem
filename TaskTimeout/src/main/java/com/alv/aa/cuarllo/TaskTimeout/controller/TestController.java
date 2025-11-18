package com.alv.aa.cuarllo.TaskTimeout.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tasktimeout")
public class TestController {

    @GetMapping("/public")
    public String publicEndpoint() {
        return "This is a public endpoint in TaskTimeout.";
    }

    @GetMapping("/protected")    
    public String protectedEndpoint() {
        return "This is a protected endpoint in TaskTimeout. You need a valid JWT.";
    }
}
