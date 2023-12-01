package com.example.accessingdatamysql.myorg;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name="Organization_Roster")
public class Organization_Roster {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer rosterId;

    private String userEmail;

    private Integer organizationId;

    public Integer getRosterId() {
        return rosterId;
    }

    public void setRosterId(Integer rosterId) {
        this.rosterId = rosterId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Organization_Roster that = (Organization_Roster) o;
        return getRosterId().equals(that.getRosterId()) && userEmail.equals(that.userEmail) && organizationId.equals(that.organizationId) && type == that.type;
    }

    @Override
    public int hashCode() {
        return Objects.hash(getRosterId(), userEmail, organizationId, type);
    }

    public Organization_Roster() {
    }

    enum Type {
        OWNER,
        MANAGER,
        MEMBER
    }
    @Enumerated(EnumType.STRING)
    private Type type;
}
