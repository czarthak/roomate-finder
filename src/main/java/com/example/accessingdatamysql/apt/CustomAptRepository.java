package com.example.accessingdatamysql.apt;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class CustomAptRepository {

    @Autowired
    private EntityManager entityManager;

    @Transactional
    public List<Object[]> getAptDescriptions(String email)
    {
        String query = "SELECT description FROM APT WHERE email = ?1";

        Query q = this.entityManager.createNativeQuery(query)
                .setParameter(1, email);
        return (List<Object[]>)q.getResultList();
    }
}