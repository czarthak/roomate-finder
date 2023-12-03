package com.example.accessingdatamysql;


import jakarta.persistence.*;

@Entity // This tells Hibernate to make a table out of this class
@Table(name = "REQUEST")
public class Request {

    // enum Status {
    //     PENDING,
    //     ACCEPTED,
    //     DECLINED
    // }

    // enum Type {
    //     JOIN,
    //     ITEM
    // }

    private String userEmail;

    // private int orgId;

    private String organizationName;

    private String description;

    // private Status status;

    private String status;
    
    private String type;
    
    // private Type type;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    // public int getOrgId() {
    //     return orgId;
    // }

    // public void setOrgId(int orgId) {
    //     this.orgId = orgId;
    // }

    public String getOrganizationName() {
        return organizationName;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Id
    @Column(nullable = false)
    private int requestId;

    public int getRequestId() {
        return requestId;
    }

    public void setRequestId(int requestId) {
        this.requestId = requestId;
    }
}