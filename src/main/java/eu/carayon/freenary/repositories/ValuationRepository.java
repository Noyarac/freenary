package eu.carayon.freenary.repositories;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import eu.carayon.freenary.entities.Valuation;

public interface ValuationRepository extends JpaRepository<Valuation, Long>{
    @Query("SELECT v FROM Valuation v WHERE v.investment.id = :investmentId AND v.date <= :date ORDER BY v.date DESC")
    Optional<Valuation> findClosestValuation(@Param("investmentId") long investmentId, @Param("date") LocalDate date);
}
