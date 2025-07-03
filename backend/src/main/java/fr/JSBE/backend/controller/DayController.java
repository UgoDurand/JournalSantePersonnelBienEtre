package fr.JSBE.backend.controller;

import fr.JSBE.backend.model.Day;
import fr.JSBE.backend.repository.DayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/days")
public class DayController {
    @Autowired
    private DayRepository dayRepository;


    /*
    * Récupère tous les jours d'un utilisateur
    * @param userId l'id de l'utilisateur
    * @return la liste des jours
    */
    @GetMapping("/user/{userId}")
    public List<Day> getDaysByUser(@PathVariable Long userId) {
        return dayRepository.findByUserId(userId);
    }


    /*
    * Donne le détail d'un jour spécifique d'un utilisateur
    * @param userId l'id de l'utilisateur
    * @param date la date du jour
    * @return le jour
    */
    @GetMapping("/user/{userId}/date/{date}")
    public ResponseEntity<Day> getDayDetails(@PathVariable Long userId, @PathVariable String date) {
        LocalDate localDate = LocalDate.parse(date);
        Day day = dayRepository.findByUserIdAndDate(userId, localDate);
        if (day == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(day);
    }
} 