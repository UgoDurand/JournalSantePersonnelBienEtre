package fr.JSBE.backend.controller;

import fr.JSBE.backend.model.User;
import fr.JSBE.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    /**
     * Endpoint pour ajouter un nouvel utilisateur
     */
    @PostMapping("/add")
    public ResponseEntity<?> addUser(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Un utilisateur avec cet email existe déjà.");
        }
        user.setCreatedAt(java.time.LocalDateTime.now());
        user.setUpdatedAt(java.time.LocalDateTime.now());
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }

    /**
     * Endpoint pour supprimer un utilisateur par son ID
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.status(404).body("Utilisateur non trouvé");
        }
        userRepository.deleteById(id);
        return ResponseEntity.ok().body("Utilisateur supprimé avec succès");
    }

    /**
     * Endpoint pour modifier un utilisateur existant
     */
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User user) {
        return userRepository.findById(id)
                .map(existingUser -> {
                    existingUser.setName(user.getName());
                    existingUser.setEmail(user.getEmail());
                    existingUser.setImageUrl(user.getImageUrl());
                    existingUser.setEmailVerified(user.getEmailVerified());
                    existingUser.setProvider(user.getProvider());
                    existingUser.setProviderId(user.getProviderId());
                    existingUser.setUpdatedAt(java.time.LocalDateTime.now());
                    User updatedUser = userRepository.save(existingUser);
                    return ResponseEntity.ok(updatedUser);
                })
                .orElseGet(() -> ResponseEntity.status(404).body("Utilisateur non trouvé"));
    }
} 