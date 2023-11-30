package com.example.accessingdatamysql;


import jakarta.persistence.*;

@Entity // This tells Hibernate to make a table out of this class
@Table(name = "ORGANIZATION")
public class Organization {

    // enum Category {
    //     ACADEMIC,
    //     RECREATION,
    //     TECHNOLOGY,
    //     POLITICS,
    //     GREEKLIFE
    // }

    // private Category category;

    private String category;

    private Integer membercount;

    private String name;

    private String email;

    private String owner;

    private String description;

    // public Category getCategory() {
    //     return category;
    // }

    // public void setCategory(Category category) {
    //     this.category = category;
    // }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getMembercount() {
        return membercount;
    }

    public void setMembercount(Integer membercount) {
        this.membercount = membercount;
    }

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    @Id
    @Column(name="organizationId")
    @GeneratedValue(strategy=GenerationType.IDENTITY)   
    private Integer organizationId;

    public int getOrgId() {
        return organizationId;
    }

    public void setOrgId(Integer orgId) {
        this.organizationId = orgId;
    }

}