package fr.JSBE.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "days", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "date"})
})
public class Day {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDate date;

    @OneToOne
    @JoinColumn(name = "mood_id")
    private Mood mood;

    @OneToOne
    @JoinColumn(name = "sport_id")
    private Sport sport;

    @OneToOne
    @JoinColumn(name = "sleep_id")
    private Sleep sleep;

    @OneToOne
    @JoinColumn(name = "diet_id")
    private Diet diet;

    // Getters et setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    public Mood getMood() { return mood; }
    public void setMood(Mood mood) { this.mood = mood; }
    public Sport getSport() { return sport; }
    public void setSport(Sport sport) { this.sport = sport; }
    public Sleep getSleep() { return sleep; }
    public void setSleep(Sleep sleep) { this.sleep = sleep; }
    public Diet getDiet() { return diet; }
    public void setDiet(Diet diet) { this.diet = diet; }
} 