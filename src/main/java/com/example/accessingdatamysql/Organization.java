package com.example.accessingdatamysql;


import jakarta.persistence.*;

@Entity // This tells Hibernate to make a table out of this class
@Table(name = "ORGANIZATION")
public class Organization {

    private String name;

    private String email;

    private String ownerEmail;

    private String desc;

    @Id
    @Column(nullable = false)
    private Integer organizationId;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getOwnerEmail() {
        return ownerEmail;
    }

    public void setOwnerEmail(String ownerEmail) {
        this.ownerEmail = ownerEmail;
    }

    @Id
    @Column(nullable = false)
    private int orgId;

    public int getOrgId() {
        return orgId;
    }

    public void setOrgId(int orgId) {
        this.orgId = orgId;
    }

}