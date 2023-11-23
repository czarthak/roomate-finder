package com.example.accessingdatamysql;


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

    private int orgId;

    private String desc;

    private Status status;
    
    private Type type;

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

    public int getOrgId() {
        return orgId;
    }

    public void setOrgId(int orgId) {
        this.orgId = orgId;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    @Id
    @Column(nullable = false)
    private int reqId;

    public int getReqId() {
        return reqId;
    }

    public void setReqId(int reqId) {
        this.reqId = reqId;
    }
}