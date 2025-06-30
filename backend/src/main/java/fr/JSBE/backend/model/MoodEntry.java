package fr.JSBE.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class MoodEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Mood mood;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private WellBeing wellBeing;

    // Getters et setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    public Mood getMood() { return mood; }
    public void setMood(Mood mood) { this.mood = mood; }
    public WellBeing getWellBeing() { return wellBeing; }
    public void setWellBeing(WellBeing wellBeing) { this.wellBeing = wellBeing; }
} 