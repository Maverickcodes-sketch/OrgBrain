package com.example.orgbrain.Service;

import com.example.orgbrain.DTO.EmployeeRequest;
import com.example.orgbrain.Entity.Employee;
import com.example.orgbrain.Repository.EmployeeRepository;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class EmployeeService {

    private final EmployeeRepository repository;
    private final VectorStore vectorStore;
    private final ObjectMapper objectMapper;

    public EmployeeService(EmployeeRepository repository,
                           VectorStore vectorStore,
                           ObjectMapper objectMapper) {
        this.repository = repository;
        this.vectorStore = vectorStore;
        this.objectMapper = objectMapper;


        this.objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
    }

    public Employee saveOrUpdate(EmployeeRequest request, String userId) throws JsonMappingException {


        Employee employee = repository.findByUserId(userId)
                .orElseGet(() -> {
                    Employee e = new Employee();
                    e.setUserId(userId); // always controlled by backend
                    return e;
                });


        objectMapper.updateValue(employee, request);


        Employee saved = repository.save(employee);


        reindexEmployee(saved);

        return saved;
    }

    private void reindexEmployee(Employee employee) {

        String docId = employee.getUserId();


        vectorStore.delete(List.of(docId));

        String content = """
            Name: %s
            Email: %s
            Phone: %s
            Role: %s
            Tech Stack: %s
            Experience: %d years
            Availability: %s
            """.formatted(
                employee.getName(),
                employee.getEmail(),
                employee.getPhoneNumber(),
                employee.getRole(),
                employee.getTechStack(),
                employee.getExperience(),
                employee.isAvailable() ? "Available" : "Not Available"
        );

        vectorStore.add(List.of(
                new Document(
                        docId,
                        content,
                        Map.of(
                                "employeeId", employee.getId(),
                                "userId", employee.getUserId(),
                                "email", employee.getEmail(),
                                "phoneNumber", employee.getPhoneNumber(),
                                "role", employee.getRole(),
                                "techStack", employee.getTechStack(),
                                "experience", employee.getExperience(),
                                "available", employee.isAvailable()
                        )
                )
        ));
    }
}
