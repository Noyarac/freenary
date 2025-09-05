package eu.carayon.freenary.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import eu.carayon.freenary.entities.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long>{
    Optional<UserEntity> findByUsername(String username);
}
