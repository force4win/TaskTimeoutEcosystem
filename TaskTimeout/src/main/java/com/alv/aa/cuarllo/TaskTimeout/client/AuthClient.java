package com.alv.aa.cuarllo.TaskTimeout.client;

import com.alv.aa.cuarllo.TaskTimeout.dto.TokenValidationRequest;
import com.alv.aa.cuarllo.TaskTimeout.dto.MessageResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "login-jwt", url = "http://localhost:8080")
public interface AuthClient {

    @PostMapping("/api/auth/validateToken")
    ResponseEntity<MessageResponse> validateToken(@RequestBody TokenValidationRequest tokenRequest);
}
