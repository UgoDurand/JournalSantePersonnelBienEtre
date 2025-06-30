package fr.JSBE.backend.model;

import jakarta.persistence.*;

@Entity
public class NotificationSettings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private Boolean dailyReminders;

    // Getters et setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Boolean getDailyReminders() { return dailyReminders; }
    public void setDailyReminders(Boolean dailyReminders) { this.dailyReminders = dailyReminders; }