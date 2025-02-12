package pl.lodz.p.edu.ProjektOro.config.repositoris;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.lodz.p.edu.ProjektOro.entitis.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository <User, Long>{
    Optional<User> findByUserName(String username);
    Optional<User> findByEmail(String email);
}
