package fr.JSBE.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class SleepEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private Integer duration; // en minutes

    @Column(nullable = false)
    private Integer efficiency; // en %

    @Column(nullable = false)
    private Integer consistency; // en %

    // Getters et setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    public Integer getDuration() { return duration; }
    public void setDuration(Integer duration) { this.duration = duration; }
    public Integer getEfficiency() { return efficiency; }
    public void setEfficiency(Integer efficiency) { this.efficiency = efficiency; }
    public Integer getConsistency() { return consistency; }
    public void setConsistency(Integer consistency) { this.consistency = consistency; }
} 