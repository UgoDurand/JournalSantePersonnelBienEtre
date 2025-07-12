package fr.JSBE.backend.repository;

import fr.JSBE.backend.model.Diet;
import fr.JSBE.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface DietRepository extends JpaRepository<Diet, Long> {
    
    Optional<Diet> findByUserAndDate(User user, LocalDate date);
    
    List<Diet> findByUserOrderByDateDesc(User user);
    
    @Query("SELECT d FROM Diet d WHERE d.user = :user AND d.date BETWEEN :startDate AND :endDate ORDER BY d.date DESC")
    List<Diet> findByUserAndDateBetween(@Param("user") User user, 
                                       @Param("startDate") LocalDate startDate, 
                                       @Param("endDate") LocalDate endDate);
    
    @Query("SELECT d FROM Diet d WHERE d.user.id = :userId AND d.date = :date")
    Optional<Diet> findByUserIdAndDate(@Param("userId") Long userId, @Param("date") LocalDate date);
    
    List<Diet> findByUserIdOrderByDateDesc(Long userId);
} 