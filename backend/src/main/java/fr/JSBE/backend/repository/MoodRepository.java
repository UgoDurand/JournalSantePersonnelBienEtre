package fr.JSBE.backend.repository;

import fr.JSBE.backend.model.Mood;
import fr.JSBE.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * Repository pour les données d'humeur
 */
@Repository
public interface MoodRepository extends JpaRepository<Mood, Long> {
    
    Optional<Mood> findByUserAndDate(User user, LocalDate date);
    
    List<Mood> findByUserOrderByDateDesc(User user);
    
    @Query("SELECT m FROM Mood m WHERE m.user = :user AND m.date BETWEEN :startDate AND :endDate ORDER BY m.date DESC")
    List<Mood> findByUserAndDateBetween(@Param("user") User user, 
                                       @Param("startDate") LocalDate startDate, 
                                       @Param("endDate") LocalDate endDate);
    
    @Query("SELECT m FROM Mood m WHERE m.user.id = :userId AND m.date = :date")
    Optional<Mood> findByUserIdAndDate(@Param("userId") Long userId, @Param("date") LocalDate date);
    
    List<Mood> findByUserIdOrderByDateDesc(Long userId);
} 