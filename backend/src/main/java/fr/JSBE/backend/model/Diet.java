package fr.JSBE.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "diets", indexes = {
    @Index(name = "idx_diet_user_date", columnList = "user_id, date")
})
public class Diet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDate date;

    @ManyToMany
    @JoinTable(name = "diet_breakfast",
        joinColumns = @JoinColumn(name = "diet_id"),
        inverseJoinColumns = @JoinColumn(name = "food_id"))
    private List<Food> breakfast;

    @ManyToMany
    @JoinTable(name = "diet_lunch",
        joinColumns = @JoinColumn(name = "diet_id"),
        inverseJoinColumns = @JoinColumn(name = "food_id"))
    private List<Food> lunch;

    @ManyToMany
    @JoinTable(name = "diet_dinner",
        joinColumns = @JoinColumn(name = "diet_id"),
        inverseJoinColumns = @JoinColumn(name = "food_id"))
    private List<Food> dinner;

    @ManyToMany
    @JoinTable(name = "diet_snack",
        joinColumns = @JoinColumn(name = "diet_id"),
        inverseJoinColumns = @JoinColumn(name = "food_id"))
    private List<Food> snack;

    @Column(nullable = false)
    private Integer water; // en ml

    // Getters et setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    public List<Food> getBreakfast() { return breakfast; }
    public void setBreakfast(List<Food> breakfast) { this.breakfast = breakfast; }
    public List<Food> getLunch() { return lunch; }
    public void setLunch(List<Food> lunch) { this.lunch = lunch; }
    public List<Food> getDinner() { return dinner; }
    public void setDinner(List<Food> dinner) { this.dinner = dinner; }
    public List<Food> getSnack() { return snack; }
    public void setSnack(List<Food> snack) { this.snack = snack; }
    public Integer getWater() { return water; }
    public void setWater(Integer water) { this.water = water; }
} 