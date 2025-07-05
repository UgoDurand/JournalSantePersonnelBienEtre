package fr.JSBE.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Entité représentant les données d'alimentation d'un utilisateur
 */
@Entity
@Table(name = "diet_data")
public class Diet {
    
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
    
    @Column(name = "breakfast")
    private String breakfast;
    
    @Column(name = "lunch")
    private String lunch;
    
    @Column(name = "dinner")
    private String dinner;
    
    @Column(name = "snacks")
    private String snacks;
    
    @Column(name = "calories")
    private Integer calories;
    
    @Column(name = "water_intake")
    private Integer waterIntake; // en ml
    
    @Column(name = "notes")
    private String notes;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Constructeurs
    public Diet() {}
    
    public Diet(User user, LocalDate date) {
        this.user = user;
        this.date = date;
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
    
    public String getBreakfast() { return breakfast; }
    public void setBreakfast(String breakfast) { this.breakfast = breakfast; }
    
    public String getLunch() { return lunch; }
    public void setLunch(String lunch) { this.lunch = lunch; }
    
    public String getDinner() { return dinner; }
    public void setDinner(String dinner) { this.dinner = dinner; }
    
    public String getSnacks() { return snacks; }
    public void setSnacks(String snacks) { this.snacks = snacks; }
    
    public Integer getCalories() { return calories; }
    public void setCalories(Integer calories) { this.calories = calories; }
    
    public Integer getWaterIntake() { return waterIntake; }
    public void setWaterIntake(Integer waterIntake) { this.waterIntake = waterIntake; }
    
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
} 