package fr.JSBE.backend.repository;

import fr.JSBE.backend.model.Sleep;
import fr.JSBE.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * Repository pour les données de sommeil
 */
@Repository
public interface SleepRepository extends JpaRepository<Sleep, Long> {
    
    /**
     * Trouve les données de sommeil d'un utilisateur pour une date donnée
     * @param user l'utilisateur
     * @param date la date
     * @return les données de sommeil ou Optional.empty()
     */
    Optional<Sleep> findByUserAndDate(User user, LocalDate date);
    
    /**
     * Trouve toutes les données de sommeil d'un utilisateur
     * @param user l'utilisateur
     * @return la liste des données de sommeil
     */
    List<Sleep> findByUserOrderByDateDesc(User user);
    
    /**
     * Trouve les données de sommeil d'un utilisateur dans une plage de dates
     * @param user l'utilisateur
     * @param startDate date de début
     * @param endDate date de fin
     * @return la liste des données de sommeil dans la plage
     */
    @Query("SELECT s FROM Sleep s WHERE s.user = :user AND s.date BETWEEN :startDate AND :endDate ORDER BY s.date DESC")
    List<Sleep> findByUserAndDateBetween(@Param("user") User user, 
                                        @Param("startDate") LocalDate startDate, 
                                        @Param("endDate") LocalDate endDate);
    
    /**
     * Trouve les données de sommeil d'un utilisateur pour une date spécifique
     * @param userId l'ID de l'utilisateur
     * @param date la date
     * @return les données de sommeil ou Optional.empty()
     */
    @Query("SELECT s FROM Sleep s WHERE s.user.id = :userId AND s.date = :date")
    Optional<Sleep> findByUserIdAndDate(@Param("userId") Long userId, @Param("date") LocalDate date);
    
    /**
     * Trouve toutes les données de sommeil d'un utilisateur par son ID
     * @param userId l'ID de l'utilisateur
     * @return la liste des données de sommeil
     */
    List<Sleep> findByUserIdOrderByDateDesc(Long userId);
} 