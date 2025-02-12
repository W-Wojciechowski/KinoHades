package pl.lodz.p.edu.ProjektOro.config.repositoris;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.lodz.p.edu.ProjektOro.entitis.Authority;


@Repository
public interface AuthorityRepository extends JpaRepository<Authority, Long> {
}
