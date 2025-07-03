package fr.JSBE.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "sleeps", indexes = {
    @Index(name = "idx_sleep_user_date", columnList = "user_id, date")
})
public class Sleep {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private LocalTime heureCoucher;

    @Column(nullable = false)
    private LocalTime heureLever;


    // Getters et setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    public LocalTime getHeureCoucher() { return heureCoucher; }
    public void setHeureCoucher(LocalTime heureCoucher) { this.heureCoucher = heureCoucher; }
    public LocalTime getHeureLever() { return heureLever; }
    public void setHeureLever(LocalTime heureLever) { this.heureLever = heureLever; }
} 