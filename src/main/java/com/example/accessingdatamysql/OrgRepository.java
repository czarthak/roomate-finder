package com.example.accessingdatamysql;


import org.springframework.data.repository.CrudRepository;

import com.example.accessingdatamysql.Organization;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface OrgRepository extends CrudRepository<Organization, Integer> {

}