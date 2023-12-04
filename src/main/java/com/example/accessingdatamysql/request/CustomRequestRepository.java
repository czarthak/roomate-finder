package com.example.accessingdatamysql.request;

import com.example.accessingdatamysql.myorg.OrganizationRoster;
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
        //this is basically just for join type requests
        Integer requestId;
        if (json.get("requestId") instanceof Integer)
            requestId = (Integer) json.get("requestId");
        else
            requestId = Integer.parseInt((String) json.get("requestId"));
        Integer orgId;
        if (json.get("orgId") instanceof Integer)
            orgId = (Integer) json.get("orgId");
        else
            orgId = Integer.parseInt((String) json.get("orgId"));
        String nativeQuery = "UPDATE REQUEST r SET status = ?1 WHERE r.request_id = ?2";
        Query query = entityManager.createNativeQuery(nativeQuery)
                .setParameter(1, json.get("status"))
                .setParameter(2, requestId);
        query.executeUpdate();
//        System.out.println(json.entrySet());
        if (json.get("status").equals("ACCEPTED"))
        {
            String getQuery = "SELECT r.user_email FROM REQUEST r WHERE r.request_id = ?1";
            Query getq = entityManager.createNativeQuery(getQuery)
                    .setParameter(1, requestId);
            String userEmail = (String) getq.getSingleResult();
            System.out.println(userEmail);
            String insertQuery = "INSERT INTO ORGANIZATION_ROSTER(user_email, organization_id, type) VALUES(?1, ?2, ?3)";
            Query inq = entityManager.createNativeQuery(insertQuery)
                    .setParameter(1, userEmail)
                    .setParameter(2, orgId)
                    .setParameter(3, "MEMBER");
            String memberCount = "UPDATE ORGANIZATION o SET member_count = member_count + 1 WHERE o.organization_id = ?1";
            Query memberQ = entityManager.createNativeQuery(memberCount)
                            .setParameter(1, orgId);
            inq.executeUpdate();
            //add the user as a member to the organization
            memberQ.executeUpdate(); //update member count
        }
        return query.executeUpdate() > 0;
    }
}
