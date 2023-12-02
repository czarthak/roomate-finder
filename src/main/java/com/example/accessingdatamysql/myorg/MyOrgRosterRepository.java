package com.example.accessingdatamysql.myorg;

import com.example.accessingdatamysql.org.Organization;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public class MyOrgRosterRepository implements OrgRosterRepository{

    @Autowired
    private EntityManager entityManager;

    @Transactional
    public List<Organization> findUserOrgs(String userEmail)
    {
        String nativeQuery = "SELECT DISTINCT o.* " +
                "FROM ORGANIZATION o " +
                "JOIN ORGANIZATION_ROSTER r ON o.organization_id = r.organization_id " +
                "WHERE r.user_email = :userEmail OR o.owner_email = :userEmail";
        List<Organization> organizations = entityManager
                .createNativeQuery(nativeQuery, Organization.class)
                .setParameter("userEmail", userEmail)
                .getResultList();
        return organizations;
    }

    @Transactional
    public Map<String, Object> findUserOrg(String userEmail, Integer orgId )
    {
        Map<String, Object> result = new HashMap<>();
        try {

            String nativeQuery = "SELECT r.type, r.user_email, o.* " +
                    "FROM ORGANIZATION_ROSTER r " +
                    "JOIN ORGANIZATION o ON r.organization_id = o.organization_id " +
                    "WHERE r.user_email = :userEmail AND r.organization_id = :orgId";
            OrgUserType queryResult = (OrgUserType) entityManager.createNativeQuery(nativeQuery, OrgUserType.class)
                    .setParameter("userEmail", userEmail)
                    .setParameter("orgId", orgId)
                    .getSingleResult();

            if (queryResult != null) {
                result.put("result", "success");
                result.put("type", queryResult.getType());
                result.put("userEmail", queryResult.getUserEmail());
                result.put("orgId", orgId);
                result.put("data", queryResult);
                return result;
            }
            result.put("result", "failure");
        }
        catch (Exception e)
        {
            result.put("result", "failure");
            //result.put("exception", e.getStackTrace());
        }
        return result;
    }

    @Transactional
    public List<Object> getRoster(Integer orgId)
    {
        String nativeQuery = "SELECT u.fname, u.lname, u.email, r.type" +
                    " FROM ORGANIZATION_ROSTER r" +
                    " JOIN USER u ON r.user_email=u.email" +
                    " WHERE r.organization_id = :orgId";
        return(entityManager.createNativeQuery(nativeQuery)
                .setParameter("orgId", orgId)
                .getResultList());

    }

    @Transactional
    public Map<String, Object> updateMember(Integer orgId, String memberEmail, OrganizationRoster.Type type)
    {
        Map<String, Object> result = new HashMap<>();
        try {
            String query = "UPDATE organization_roster SET type = :type " +
                    "WHERE organization_id = :orgId AND user_email = :memberEmail";
            Query nativeQuery = entityManager.createNativeQuery(query);
            nativeQuery.setParameter("type", type.name());
            nativeQuery.setParameter("orgId", orgId);
            nativeQuery.setParameter("memberEmail", memberEmail);

            int updatedRows = nativeQuery.executeUpdate();

            result.put("result", "success");
            result.put("updatedRows", updatedRows);
        } catch (Exception e) {
            result.put("result", "failure");
            result.put("error", e.getMessage());
        }
        return result;
    }

    @Transactional
    public Map<String, Object> deleteMember(Integer orgId, String memberEmail)
    {
        Map<String, Object> result = new HashMap<>();
        try {
            // Delete the member from ORGANIZATION_ROSTER
            String deleteQuery = "DELETE FROM organization_roster WHERE organization_id = :orgId AND user_email = :memberEmail";
            Query deleteNativeQuery = entityManager.createNativeQuery(deleteQuery);
            deleteNativeQuery.setParameter("orgId", orgId);
            deleteNativeQuery.setParameter("memberEmail", memberEmail);

            int deletedRows = deleteNativeQuery.executeUpdate();

            if (deletedRows > 0) {
                // Decrement the member count in ORGANIZATION
                String updateCountQuery = "UPDATE organization SET member_count = member_count - 1 WHERE organization_id = :orgId";
                Query updateCountNativeQuery = entityManager.createNativeQuery(updateCountQuery);
                updateCountNativeQuery.setParameter("orgId", orgId);

                int updatedCountRows = updateCountNativeQuery.executeUpdate();

                result.put("result", "success");
                result.put("deletedRows", deletedRows);
                result.put("updatedCountRows", updatedCountRows);
            } else {
                result.put("result", "failure");
                result.put("error", "Member not found in the organization roster");
            }
        } catch (Exception e) {
            result.put("result", "failure");
            result.put("error", e.getMessage());
        }
        return result;
    }

    @Override
    public <S extends OrganizationRoster> S save(S entity) {
        return null;
    }

    @Override
    public <S extends OrganizationRoster> Iterable<S> saveAll(Iterable<S> entities) {
        return null;
    }

    @Override
    public Optional<OrganizationRoster> findById(Integer integer) {
        return Optional.empty();
    }

    @Override
    public boolean existsById(Integer integer) {
        return false;
    }

    @Override
    @Transactional
    public List<OrganizationRoster> findAll() {
        TypedQuery<OrganizationRoster> query = entityManager.createQuery("SELECT o FROM Organization o", OrganizationRoster.class);
        return query.getResultList();
    }

    @Override
    public Iterable<OrganizationRoster> findAllById(Iterable<Integer> integers) {
        return null;
    }

    @Override
    public long count() {
        return 0;
    }

    @Override
    public void deleteById(Integer integer) {

    }

    @Override
    public void delete(OrganizationRoster entity) {

    }

    @Override
    public void deleteAllById(Iterable<? extends Integer> integers) {

    }

    @Override
    public void deleteAll(Iterable<? extends OrganizationRoster> entities) {

    }

    @Override
    public void deleteAll() {

    }
}
