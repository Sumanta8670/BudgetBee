package com.Sumanta.BudgetBee.repository;

import com.Sumanta.BudgetBee.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
    //select * from categories where profile_id = ?1
    List<CategoryEntity> findByProfileId(Long profileId);

    //select * from categories where id = ?1 and profile_id = ?2
    Optional<CategoryEntity> findByIdAndProfileId(Long id, Long profileId);

    //select * from categories where type = ?1 and profile_id = ?2
    List<CategoryEntity> findByTypeAndProfileId(String type, Long profileId);

    //Check if category with name exists for a profile
    Boolean existsByNameAndProfileId(String name, Long profileId);
}