package com.example.accessingdatamysql.request;


import jakarta.persistence.*;

@Entity // This tells Hibernate to make a table out of this class
@Table(name = "REQUEST")
public class Request {

    enum Status {
        PENDING,
        ACCEPTED,
        DECLINED
    }

    enum Type {
        JOIN,
        ITEM
    }

    private String userEmail;

    private Integer organizationId;

    private String description;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Enumerated(EnumType.STRING)
    private Type type;

    public Integer getOrganizationId() {
        return organizationId;
    }

    public void setOrganizationId(Integer organizationId) {
        this.organizationId = organizationId;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }



    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getRequestId() {
        return requestId;
    }

    public void setRequestId(int requestId) {
        this.requestId = requestId;
    }

    @Id
    @Column(nullable = false)
    private int requestId;

}