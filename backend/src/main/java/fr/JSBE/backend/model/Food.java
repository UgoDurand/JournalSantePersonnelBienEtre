package fr.JSBE.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "foods", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"libelle", "type", "marque"})
})
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String libelle;

    @Column(nullable = false)
    private String type; // ex : maison, industriel, bio, etc.

    @Column(nullable = false)
    private String marque; // ex : Le Gaulois, Carrefour, etc.

    @Column(nullable = false)
    private Integer calories;

    @Column(nullable = false)
    private Integer protein;

    @Column(nullable = false)
    private Integer carbs;

    @Column(nullable = false)
    private Integer lipids;

    // Getters et setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getLibelle() { return libelle; }
    public void setLibelle(String libelle) { this.libelle = libelle; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getMarque() { return marque; }
    public void setMarque(String marque) { this.marque = marque; }
    public Integer getCalories() { return calories; }
    public void setCalories(Integer calories) { this.calories = calories; }
    public Integer getProtein() { return protein; }
    public void setProtein(Integer protein) { this.protein = protein; }
    public Integer getCarbs() { return carbs; }
    public void setCarbs(Integer carbs) { this.carbs = carbs; }
    public Integer getLipids() { return lipids; }
    public void setLipids(Integer lipids) { this.lipids = lipids; }
} 