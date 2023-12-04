package com.example.accessingdatamysql.request;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

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

    @Transactional
    public Object updateRequest(Map<String, Object> json)
    {
        Integer requestId;
        if (json.get("requestId") instanceof Integer)
            requestId = (Integer) json.get("requestId");
        else
            requestId = Integer.parseInt((String) json.get("requestId"));
        String nativeQuery = "UPDATE REQUEST r SET status = ?1 WHERE r.request_id = ?2";
        Query query = entityManager.createNativeQuery(nativeQuery)
                .setParameter(1, json.get("status"))
                .setParameter(2, requestId);
        return query.executeUpdate() > 0;
    }
}
