package com.example.accessingdatamysql.item;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CustomItemRepository {

    @Autowired
    private EntityManager entityManager;

    @Transactional
    public List<Object[]> getAllItems(Integer orgId)
    {
        String nativeQuery = "SELECT I.*, L.location FROM ITEM I JOIN LOCATION L ON I.location_id = L.location_id WHERE I.organization_id = :orgId";
        Query query = entityManager.createNativeQuery(nativeQuery)
                .setParameter("orgId", orgId);

        @SuppressWarnings("unchecked")
        List<Object[]> resultList = query.getResultList();

        return resultList;
    }

    @Transactional
    public Object getItem(Integer orgId, Integer itemId)
    {
        String nativeQuery = "SELECT I.*, L.location FROM ITEM I JOIN LOCATION L ON I.location_id = L.location_id WHERE I.organization_id = :orgId AND I.item_id = :itemId";
        Query query = entityManager.createNativeQuery(nativeQuery)
                .setParameter("orgId", orgId)
                .setParameter("itemId", itemId);

        return query.getSingleResult();
    }


}
