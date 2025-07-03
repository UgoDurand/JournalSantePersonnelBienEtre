package fr.JSBE.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "moods", indexes = {
    @Index(name = "idx_mood_user_date", columnList = "user_id, date")
})
public class Mood {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private String mood;

    @Column(nullable = false)
    private Integer energie; // 0-100

    // Getters et setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    public String getMood() { return mood; }
    public void setMood(String mood) { this.mood = mood; }
    public Integer getEnergie() { return energie; }
    public void setEnergie(Integer energie) { this.energie = energie; }
} 