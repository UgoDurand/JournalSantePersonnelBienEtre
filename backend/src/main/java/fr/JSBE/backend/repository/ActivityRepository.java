package fr.JSBE.backend.repository;

import fr.JSBE.backend.model.Activity;
import fr.JSBE.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * Repository pour les données d'activité physique
 */
@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {
    
    List<Activity> findByUserAndDate(User user, LocalDate date);
    
    List<Activity> findByUserOrderByDateDesc(User user);
    
    @Query("SELECT a FROM Activity a WHERE a.user = :user AND a.date BETWEEN :startDate AND :endDate ORDER BY a.date DESC")
    List<Activity> findByUserAndDateBetween(@Param("user") User user, 
                                           @Param("startDate") LocalDate startDate, 
                                           @Param("endDate") LocalDate endDate);
    
    @Query("SELECT a FROM Activity a WHERE a.user.id = :userId AND a.date = :date")
    List<Activity> findByUserIdAndDate(@Param("userId") Long userId, @Param("date") LocalDate date);
    
    List<Activity> findByUserIdOrderByDateDesc(Long userId);
} 