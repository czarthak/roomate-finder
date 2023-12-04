package com.example.accessingdatamysql.request;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CustomRequestRepository {

    @Autowired
    private EntityManager entityManager;

    @Transactional
    public List<Object> getRequests(Integer orgId)
    {
        String nativeQuery = "SELECT R.* FROM REQUEST R WHERE R.organization_id = :orgId";
        Query query = entityManager.createNativeQuery(nativeQuery)
                .setParameter("orgId", orgId);
        return query.getResultList();
    }

}
