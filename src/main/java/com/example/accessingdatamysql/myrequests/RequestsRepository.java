package com.example.accessingdatamysql.myorg;

import com.example.accessingdatamysql.Request;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class RequestsRepository {

    @Autowired
    private EntityManager entityManager;

    @Transactional
    public List<Request> findUserRequests(String userEmail)
    {
        String nativeQuery = "SELECT * FROM REQUEST WHERE user_email = :userEmail";
        List<Request> requests = entityManager
                .createNativeQuery(nativeQuery, Request.class)
                .setParameter("userEmail", userEmail)
                .getResultList();
        return requests;
    }
}
