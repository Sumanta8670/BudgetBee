package com.Sumanta.BudgetBee.repository;

import com.Sumanta.BudgetBee.entity.ProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<ProfileEntity, Long> {
    //select * from profiles where email = ?
    Optional<ProfileEntity> findByEmail(String email);

    //select * from profiles where activation_token = ?
    Optional<ProfileEntity> findByActivationToken(String activationToken);
}
