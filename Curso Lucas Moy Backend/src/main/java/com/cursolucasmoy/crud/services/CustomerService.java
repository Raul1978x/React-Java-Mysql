package com.cursolucasmoy.crud.services;

import com.cursolucasmoy.crud.entities.Customer;
import com.cursolucasmoy.crud.repository.ICustomerRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    @Autowired
    private ICustomerRepository iCustomerRepository;

    @Transactional
    public List<Customer> getAll(){
         return iCustomerRepository.findAll();
    }


    @Transactional
    public Customer getById(Long id){
        return iCustomerRepository.findById(id).get();
    }

    @Transactional
    public void removeById(Long id){
         iCustomerRepository.deleteById(id);
    }

    @Transactional
    public Customer save(Customer  customer){
        return iCustomerRepository.save(customer);
    }
}