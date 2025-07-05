package fr.JSBE.backend.controller;

import fr.JSBE.backend.model.Diet;
import fr.JSBE.backend.model.User;
import fr.JSBE.backend.repository.DietRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;

/**
 * Contrôleur pour la gestion des données d'alimentation
 * Tous les endpoints nécessitent une authentification JWT
 */
@RestController
@RequestMapping("/diet")
@CrossOrigin(origins = "http://localhost:3000")
public class DietController {
    
    @Autowired
    private DietRepository dietRepository;
    
    @GetMapping
    public ResponseEntity<?> getDietByDate(@RequestParam String date, Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            LocalDate parsedDate = LocalDate.parse(date);
            
            Optional<Diet> dietData = dietRepository.findByUserAndDate(user, parsedDate);
            
            if (dietData.isPresent()) {
                return ResponseEntity.ok(dietData.get());
            } else {
                return ResponseEntity.notFound().build();
            }
            
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body("{\"error\": \"Format de date invalide. Utilisez YYYY-MM-DD\"}");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
    
    @GetMapping("/range")
    public ResponseEntity<?> getDietByRange(@RequestParam String startDate, 
                                          @RequestParam String endDate, 
                                          Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            LocalDate parsedStartDate = LocalDate.parse(startDate);
            LocalDate parsedEndDate = LocalDate.parse(endDate);
            
            List<Diet> dietData = dietRepository.findByUserAndDateBetween(user, parsedStartDate, parsedEndDate);
            
            return ResponseEntity.ok(dietData);
            
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body("{\"error\": \"Format de date invalide. Utilisez YYYY-MM-DD\"}");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
    
    @GetMapping("/all")
    public ResponseEntity<?> getAllDietData(Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            List<Diet> dietData = dietRepository.findByUserOrderByDateDesc(user);
            
            return ResponseEntity.ok(dietData);
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
    
    @PostMapping
    public ResponseEntity<?> createDietData(@RequestBody Diet dietData, Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            
            Optional<Diet> existingData = dietRepository.findByUserAndDate(user, dietData.getDate());
            
            if (existingData.isPresent()) {
                Diet existing = existingData.get();
                existing.setBreakfast(dietData.getBreakfast());
                existing.setLunch(dietData.getLunch());
                existing.setDinner(dietData.getDinner());
                existing.setSnacks(dietData.getSnacks());
                existing.setCalories(dietData.getCalories());
                existing.setWaterIntake(dietData.getWaterIntake());
                existing.setNotes(dietData.getNotes());
                
                Diet saved = dietRepository.save(existing);
                return ResponseEntity.ok(saved);
            } else {
                dietData.setUser(user);
                Diet saved = dietRepository.save(dietData);
                return ResponseEntity.ok(saved);
            }
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateDietData(@PathVariable Long id, 
                                          @RequestBody Diet dietData, 
                                          Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            
            Optional<Diet> existingData = dietRepository.findById(id);
            
            if (existingData.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            Diet existing = existingData.get();
            
            if (!existing.getUser().getId().equals(user.getId())) {
                return ResponseEntity.status(403).body("{\"error\": \"Accès non autorisé\"}");
            }
            
            existing.setDate(dietData.getDate());
            existing.setBreakfast(dietData.getBreakfast());
            existing.setLunch(dietData.getLunch());
            existing.setDinner(dietData.getDinner());
            existing.setSnacks(dietData.getSnacks());
            existing.setCalories(dietData.getCalories());
            existing.setWaterIntake(dietData.getWaterIntake());
            existing.setNotes(dietData.getNotes());
            
            Diet saved = dietRepository.save(existing);
            return ResponseEntity.ok(saved);
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDietData(@PathVariable Long id, Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            
            Optional<Diet> existingData = dietRepository.findById(id);
            
            if (existingData.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            Diet existing = existingData.get();
            
            if (!existing.getUser().getId().equals(user.getId())) {
                return ResponseEntity.status(403).body("{\"error\": \"Accès non autorisé\"}");
            }
            
            dietRepository.delete(existing);
            return ResponseEntity.ok().body("{\"message\": \"Données d'alimentation supprimées avec succès\"}");
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
} 