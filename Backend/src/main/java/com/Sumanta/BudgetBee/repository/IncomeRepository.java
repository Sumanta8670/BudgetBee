package com.Sumanta.BudgetBee.repository;

import com.Sumanta.BudgetBee.entity.IncomeEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface IncomeRepository extends JpaRepository<IncomeEntity, Long> {

    //select * from incomes where profile_id = ?1 order by date desc
    @EntityGraph(attributePaths = {"category", "profile"})
    List<IncomeEntity> findByProfileIdOrderByDateDesc(Long profileId);

    //select * from incomes where profile_id = ?1 order by date desc limit 10
    @EntityGraph(attributePaths = {"category", "profile"})
    List<IncomeEntity> findTop10ByProfileIdOrderByDateDesc(Long profileId);

    //Get total income amount for a profile
    @Query("SELECT SUM(i.amount) FROM IncomeEntity i WHERE i.profile.id = :profileId")
    BigDecimal findTotalIncomeByProfileId(@Param("profileId") Long profileId);

    //select * from incomes where profile_id = ?1 and date between ?2 and ?3 and name like %?4%
    @EntityGraph(attributePaths = {"category", "profile"})
    List<IncomeEntity> findByProfileIdAndDateBetweenAndNameContainingIgnoreCase(
            Long profileId,
            LocalDate startDate,
            LocalDate endDate,
            String keyword,
            Sort sort
    );

    //select * from incomes where profile_id = ?1 and date between ?2 and ?3
    @EntityGraph(attributePaths = {"category", "profile"})
    List<IncomeEntity> findByProfileIdAndDateBetween(Long profileId, LocalDate startDate, LocalDate endDate);
}