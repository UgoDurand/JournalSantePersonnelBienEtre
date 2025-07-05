package fr.JSBE.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;

/**
 * Entité représentant les données de sommeil d'un utilisateur
 */
@Entity
@Table(name = "sleep_data")
public class Sleep {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;
    
    @NotNull
    @Column(nullable = false)
    private LocalDate date;
    
    @Column(name = "bedtime")
    private LocalTime bedtime;
    
    @Column(name = "wakeup")
    private LocalTime wakeup;
    
    @Column(name = "quality")
    private String quality; // good, fair, poor
    
    @Column(name = "notes")
    private String notes;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Constructeurs
    public Sleep() {}
    
    public Sleep(User user, LocalDate date, LocalTime bedtime, LocalTime wakeup, String quality) {
        this.user = user;
        this.date = date;
        this.bedtime = bedtime;
        this.wakeup = wakeup;
        this.quality = quality;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
    
    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    
    public LocalTime getBedtime() { return bedtime; }
    public void setBedtime(LocalTime bedtime) { this.bedtime = bedtime; }
    
    public LocalTime getWakeup() { return wakeup; }
    public void setWakeup(LocalTime wakeup) { this.wakeup = wakeup; }
    
    public String getQuality() { return quality; }
    public void setQuality(String quality) { this.quality = quality; }
    
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
} 