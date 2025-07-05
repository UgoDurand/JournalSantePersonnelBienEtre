package fr.JSBE.backend.controller;

import fr.JSBE.backend.model.Mood;
import fr.JSBE.backend.model.User;
import fr.JSBE.backend.repository.MoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;

/**
 * Contrôleur pour la gestion des données d'humeur
 * Tous les endpoints nécessitent une authentification JWT
 */
@RestController
@RequestMapping("/mood")
@CrossOrigin(origins = "http://localhost:3000")
public class MoodController {
    
    @Autowired
    private MoodRepository moodRepository;
    
    @GetMapping
    public ResponseEntity<?> getMoodByDate(@RequestParam String date, Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            LocalDate parsedDate = LocalDate.parse(date);
            
            Optional<Mood> moodData = moodRepository.findByUserAndDate(user, parsedDate);
            
            if (moodData.isPresent()) {
                return ResponseEntity.ok(moodData.get());
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
    public ResponseEntity<?> getMoodByRange(@RequestParam String startDate, 
                                          @RequestParam String endDate, 
                                          Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            LocalDate parsedStartDate = LocalDate.parse(startDate);
            LocalDate parsedEndDate = LocalDate.parse(endDate);
            
            List<Mood> moodData = moodRepository.findByUserAndDateBetween(user, parsedStartDate, parsedEndDate);
            
            return ResponseEntity.ok(moodData);
            
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body("{\"error\": \"Format de date invalide. Utilisez YYYY-MM-DD\"}");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
    
    @GetMapping("/all")
    public ResponseEntity<?> getAllMoodData(Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            List<Mood> moodData = moodRepository.findByUserOrderByDateDesc(user);
            
            return ResponseEntity.ok(moodData);
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
    
    @PostMapping
    public ResponseEntity<?> createMoodData(@RequestBody Mood moodData, Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            
            Optional<Mood> existingData = moodRepository.findByUserAndDate(user, moodData.getDate());
            
            if (existingData.isPresent()) {
                Mood existing = existingData.get();
                existing.setMoodRating(moodData.getMoodRating());
                existing.setEmotions(moodData.getEmotions());
                existing.setEnergyLevel(moodData.getEnergyLevel());
                existing.setStressLevel(moodData.getStressLevel());
                existing.setNotes(moodData.getNotes());
                
                Mood saved = moodRepository.save(existing);
                return ResponseEntity.ok(saved);
            } else {
                moodData.setUser(user);
                Mood saved = moodRepository.save(moodData);
                return ResponseEntity.ok(saved);
            }
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateMoodData(@PathVariable Long id, 
                                          @RequestBody Mood moodData, 
                                          Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            
            Optional<Mood> existingData = moodRepository.findById(id);
            
            if (existingData.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            Mood existing = existingData.get();
            
            if (!existing.getUser().getId().equals(user.getId())) {
                return ResponseEntity.status(403).body("{\"error\": \"Accès non autorisé\"}");
            }
            
            existing.setDate(moodData.getDate());
            existing.setMoodRating(moodData.getMoodRating());
            existing.setEmotions(moodData.getEmotions());
            existing.setEnergyLevel(moodData.getEnergyLevel());
            existing.setStressLevel(moodData.getStressLevel());
            existing.setNotes(moodData.getNotes());
            
            Mood saved = moodRepository.save(existing);
            return ResponseEntity.ok(saved);
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMoodData(@PathVariable Long id, Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            
            Optional<Mood> existingData = moodRepository.findById(id);
            
            if (existingData.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            Mood existing = existingData.get();
            
            if (!existing.getUser().getId().equals(user.getId())) {
                return ResponseEntity.status(403).body("{\"error\": \"Accès non autorisé\"}");
            }
            
            moodRepository.delete(existing);
            return ResponseEntity.ok().body("{\"message\": \"Données d'humeur supprimées avec succès\"}");
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
} 