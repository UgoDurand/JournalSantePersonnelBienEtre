package fr.JSBE.backend.model;

import jakarta.persistence.*;

@Entity
public class Preferences {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String timezone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Units units;

    @Column(nullable = false)
    private String language;

    // Getters et setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getTimezone() { return timezone; }
    public void setTimezone(String timezone) { this.timezone = timezone; }
    public Units getUnits() { return units; }
    public void setUnits(Units units) { this.units = units; }
    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }
} 