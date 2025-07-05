package fr.JSBE.backend.controller;

import fr.JSBE.backend.model.Sleep;
import fr.JSBE.backend.model.User;
import fr.JSBE.backend.repository.SleepRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;

/**
 * Contrôleur pour la gestion des données de sommeil
 * Tous les endpoints nécessitent une authentification JWT
 */
@RestController
@RequestMapping("/sleep")
@CrossOrigin(origins = "http://localhost:3000")
public class SleepController {
    
    @Autowired
    private SleepRepository sleepRepository;
    
    /**
     * Récupère les données de sommeil pour une date donnée
     * @param date la date au format YYYY-MM-DD
     * @param authentication l'authentification Spring Security
     * @return les données de sommeil ou 404 si non trouvées
     */
    @GetMapping
    public ResponseEntity<?> getSleepByDate(@RequestParam String date, Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            LocalDate parsedDate = LocalDate.parse(date);
            
            Optional<Sleep> sleepData = sleepRepository.findByUserAndDate(user, parsedDate);
            
            if (sleepData.isPresent()) {
                return ResponseEntity.ok(sleepData.get());
            } else {
                return ResponseEntity.notFound().build();
            }
            
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body("{\"error\": \"Format de date invalide. Utilisez YYYY-MM-DD\"}");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
    
    /**
     * Récupère les données de sommeil dans une plage de dates
     * @param startDate date de début au format YYYY-MM-DD
     * @param endDate date de fin au format YYYY-MM-DD
     * @param authentication l'authentification Spring Security
     * @return la liste des données de sommeil dans la plage
     */
    @GetMapping("/range")
    public ResponseEntity<?> getSleepByRange(@RequestParam String startDate, 
                                           @RequestParam String endDate, 
                                           Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            LocalDate parsedStartDate = LocalDate.parse(startDate);
            LocalDate parsedEndDate = LocalDate.parse(endDate);
            
            List<Sleep> sleepData = sleepRepository.findByUserAndDateBetween(user, parsedStartDate, parsedEndDate);
            
            return ResponseEntity.ok(sleepData);
            
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body("{\"error\": \"Format de date invalide. Utilisez YYYY-MM-DD\"}");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
    
    /**
     * Récupère toutes les données de sommeil de l'utilisateur
     * @param authentication l'authentification Spring Security
     * @return la liste de toutes les données de sommeil
     */
    @GetMapping("/all")
    public ResponseEntity<?> getAllSleepData(Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            List<Sleep> sleepData = sleepRepository.findByUserOrderByDateDesc(user);
            
            return ResponseEntity.ok(sleepData);
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
    
    /**
     * Crée ou met à jour les données de sommeil
     * @param sleepData les données de sommeil à sauvegarder
     * @param authentication l'authentification Spring Security
     * @return les données de sommeil sauvegardées
     */
    @PostMapping
    public ResponseEntity<?> createSleepData(@RequestBody Sleep sleepData, Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            
            // Vérifier si des données existent déjà pour cette date
            Optional<Sleep> existingData = sleepRepository.findByUserAndDate(user, sleepData.getDate());
            
            if (existingData.isPresent()) {
                // Mettre à jour les données existantes
                Sleep existing = existingData.get();
                existing.setBedtime(sleepData.getBedtime());
                existing.setWakeup(sleepData.getWakeup());
                existing.setQuality(sleepData.getQuality());
                existing.setNotes(sleepData.getNotes());
                
                Sleep saved = sleepRepository.save(existing);
                return ResponseEntity.ok(saved);
            } else {
                // Créer de nouvelles données
                sleepData.setUser(user);
                Sleep saved = sleepRepository.save(sleepData);
                return ResponseEntity.ok(saved);
            }
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
    
    /**
     * Met à jour les données de sommeil par ID
     * @param id l'ID des données de sommeil
     * @param sleepData les nouvelles données
     * @param authentication l'authentification Spring Security
     * @return les données mises à jour
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateSleepData(@PathVariable Long id, 
                                           @RequestBody Sleep sleepData, 
                                           Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            
            Optional<Sleep> existingData = sleepRepository.findById(id);
            
            if (existingData.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            Sleep existing = existingData.get();
            
            // Vérifier que l'utilisateur est le propriétaire des données
            if (!existing.getUser().getId().equals(user.getId())) {
                return ResponseEntity.status(403).body("{\"error\": \"Accès non autorisé\"}");
            }
            
            // Mettre à jour les données
            existing.setDate(sleepData.getDate());
            existing.setBedtime(sleepData.getBedtime());
            existing.setWakeup(sleepData.getWakeup());
            existing.setQuality(sleepData.getQuality());
            existing.setNotes(sleepData.getNotes());
            
            Sleep saved = sleepRepository.save(existing);
            return ResponseEntity.ok(saved);
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
    
    /**
     * Supprime les données de sommeil par ID
     * @param id l'ID des données de sommeil
     * @param authentication l'authentification Spring Security
     * @return confirmation de suppression
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSleepData(@PathVariable Long id, Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            
            Optional<Sleep> existingData = sleepRepository.findById(id);
            
            if (existingData.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            Sleep existing = existingData.get();
            
            // Vérifier que l'utilisateur est le propriétaire des données
            if (!existing.getUser().getId().equals(user.getId())) {
                return ResponseEntity.status(403).body("{\"error\": \"Accès non autorisé\"}");
            }
            
            sleepRepository.delete(existing);
            return ResponseEntity.ok().body("{\"message\": \"Données de sommeil supprimées avec succès\"}");
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
} 