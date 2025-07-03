package fr.JSBE.backend.repository;

import fr.JSBE.backend.model.Day;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

/*
* Repository pour la gestion des jours
*/
public interface DayRepository extends JpaRepository<Day, Long> {
    /*
    * Trouve tous les jours d'un utilisateur
    * @param userId l'id de l'utilisateur
    * @return la liste des jours
    */
    List<Day> findByUserId(Long userId);

    /*
    * Trouve un jour spécifique d'un utilisateur
    * @param userId l'id de l'utilisateur
    * @param date la date du jour
    * @return le jour
    */
    Day findByUserIdAndDate(Long userId, LocalDate date);
} 