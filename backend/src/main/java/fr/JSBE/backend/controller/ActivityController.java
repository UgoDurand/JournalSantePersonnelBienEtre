package fr.JSBE.backend.controller;

import fr.JSBE.backend.model.Activity;
import fr.JSBE.backend.model.User;
import fr.JSBE.backend.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;

/**
 * Contrôleur pour la gestion des données d'activité physique
 * Tous les endpoints nécessitent une authentification JWT
 */
@RestController
@RequestMapping("/activity")
@CrossOrigin(origins = "http://localhost:3000")
public class ActivityController {
    
    @Autowired
    private ActivityRepository activityRepository;
    
    @GetMapping
    public ResponseEntity<?> getActivityByDate(@RequestParam String date, Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            LocalDate parsedDate = LocalDate.parse(date);
            
            List<Activity> activityData = activityRepository.findByUserAndDate(user, parsedDate);
            
            return ResponseEntity.ok(activityData);
            
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body("{\"error\": \"Format de date invalide. Utilisez YYYY-MM-DD\"}");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
    
    @GetMapping("/range")
    public ResponseEntity<?> getActivityByRange(@RequestParam String startDate, 
                                              @RequestParam String endDate, 
                                              Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            LocalDate parsedStartDate = LocalDate.parse(startDate);
            LocalDate parsedEndDate = LocalDate.parse(endDate);
            
            List<Activity> activityData = activityRepository.findByUserAndDateBetween(user, parsedStartDate, parsedEndDate);
            
            return ResponseEntity.ok(activityData);
            
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body("{\"error\": \"Format de date invalide. Utilisez YYYY-MM-DD\"}");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
    
    @GetMapping("/all")
    public ResponseEntity<?> getAllActivityData(Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            List<Activity> activityData = activityRepository.findByUserOrderByDateDesc(user);
            
            return ResponseEntity.ok(activityData);
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
    
    @PostMapping
    public ResponseEntity<?> createActivityData(@RequestBody Activity activityData, Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            
            // Pour les activités, on peut avoir plusieurs activités par jour
            activityData.setUser(user);
            Activity saved = activityRepository.save(activityData);
            return ResponseEntity.ok(saved);
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateActivityData(@PathVariable Long id, 
                                              @RequestBody Activity activityData, 
                                              Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            
            Optional<Activity> existingData = activityRepository.findById(id);
            
            if (existingData.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            Activity existing = existingData.get();
            
            if (!existing.getUser().getId().equals(user.getId())) {
                return ResponseEntity.status(403).body("{\"error\": \"Accès non autorisé\"}");
            }
            
            existing.setDate(activityData.getDate());
            existing.setActivityType(activityData.getActivityType());
            existing.setDuration(activityData.getDuration());
            existing.setIntensity(activityData.getIntensity());
            existing.setCaloriesBurned(activityData.getCaloriesBurned());
            existing.setDistance(activityData.getDistance());
            existing.setNotes(activityData.getNotes());
            
            Activity saved = activityRepository.save(existing);
            return ResponseEntity.ok(saved);
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteActivityData(@PathVariable Long id, Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            
            Optional<Activity> existingData = activityRepository.findById(id);
            
            if (existingData.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            Activity existing = existingData.get();
            
            if (!existing.getUser().getId().equals(user.getId())) {
                return ResponseEntity.status(403).body("{\"error\": \"Accès non autorisé\"}");
            }
            
            activityRepository.delete(existing);
            return ResponseEntity.ok().body("{\"message\": \"Données d'activité supprimées avec succès\"}");
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
} 