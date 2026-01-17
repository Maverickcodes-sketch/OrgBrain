package com.example.orgbrain.Controller;

import com.example.orgbrain.DTO.EmployeeRequest;
import com.example.orgbrain.Entity.Employee;
import com.example.orgbrain.Service.AiAgentService;
import com.example.orgbrain.Service.EmployeeService;
import com.fasterxml.jackson.databind.JsonMappingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@Slf4j
public class ApplicationController {

    private final EmployeeService employeeService;
    private final AiAgentService aiAgentService;

    public ApplicationController(EmployeeService employeeService, AiAgentService aiAgentService) {
        this.employeeService = employeeService;
        this.aiAgentService = aiAgentService;
    }

    @GetMapping("/public")
    public String publicApi() {
        return "Public API";
    }

    @PostMapping("/employee/submit")
    public Employee submitEmployee(
            @RequestBody EmployeeRequest request,
            JwtAuthenticationToken authentication
    ) throws JsonMappingException {
        String userId = authentication.getToken().getSubject();
        return employeeService.saveOrUpdate(request, userId);
    }

    @PostMapping("/manager/chat")
    public String chat(
            @RequestParam("message") String  message,
            JwtAuthenticationToken authentication
    ) {
        String conversationId = authentication.getToken().getSubject();

        // 🔍 Log conversation scope
        log.info("Manager chat request | conversationId={} | message='{}'",
                conversationId, message);

        return aiAgentService.chat(conversationId, message);
    }
}



