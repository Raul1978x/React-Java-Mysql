package com.cursolucasmoy.crud.controller;

import com.cursolucasmoy.crud.entities.Customer;
import com.cursolucasmoy.crud.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CustomerController {

@Autowired
    CustomerService customerService;

    @GetMapping("/api/customers")
    public List<Customer> getAll(){
        return customerService.getAll();
    }

    @GetMapping("/api/customers/{id}")
    public Customer getById(@PathVariable String id){
        return customerService.getById(Long.parseLong(id));
    }

    @DeleteMapping("/api/customers/{id}")
    public void removeById(@PathVariable String id){
         customerService.removeById(Long.parseLong(id));
    }

    @PostMapping("/api/customers")
    public Customer create(@RequestBody Customer customer){
       return customerService.save(customer);
    }

}