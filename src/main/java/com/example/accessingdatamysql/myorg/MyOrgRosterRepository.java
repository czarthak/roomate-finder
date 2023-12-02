package com.example.accessingdatamysql.myorg;

import com.example.accessingdatamysql.org.Organization;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
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
