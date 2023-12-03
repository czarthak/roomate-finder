package com.example.accessingdatamysql.item;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

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
        try
        {
            String nativeQuery = "SELECT I.*, L.location FROM ITEM I JOIN LOCATION L ON I.location_id = L.location_id WHERE I.organization_id = :orgId AND I.item_id = :itemId";
            Query query = entityManager.createNativeQuery(nativeQuery)
                    .setParameter("orgId", orgId)
                    .setParameter("itemId", itemId);
            return query.getSingleResult();
        }
        catch (Exception e)
        {
            return "Item Not Found";
        }


    }

    @Transactional
    public Object deleteItem(Integer itemId)
    {
        String nativeQuery = "DELETE FROM ITEM I WHERE I.item_id = :itemId";
        Query query = entityManager.createNativeQuery(nativeQuery)
                .setParameter("itemId", itemId);
        return query.executeUpdate();
    }
    @Transactional
    public Object updateItem(Map<String, Object> json)
    {
        // Extract parameters from the JSON map
        Integer itemId = (Integer) json.get("itemId");
        String status = (String) json.get("status");
        String description = (String) json.get("description");
        Integer quantity = (Integer) json.get("quantity");
        String category = (String) json.get("category");
        String name = (String) json.get("name");

        // Use native SQL query with EntityManager to update the item
        String nativeQuery = "UPDATE ITEM SET status = ?1, description = ?2, quantity = ?3, category = ?4, name = ?5 WHERE item_id = ?6";
        Query query = entityManager.createNativeQuery(nativeQuery)
                .setParameter(1, status)
                .setParameter(2, description)
                .setParameter(3, quantity)
                .setParameter(4, category)
                .setParameter(5, name)
                .setParameter(6, itemId);

        int updatedRows = query.executeUpdate();

        return updatedRows > 0;
    }
}
