package pl.lodz.p.edu.ProjektOro.config.repositoris;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.lodz.p.edu.ProjektOro.entitis.Reservation;
import pl.lodz.p.edu.ProjektOro.entitis.User;

import java.sql.Date;
import java.util.List;
import java.util.Set;


@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    Set<Reservation> findByUser(User user);
    List<Reservation> findByDate(Date date);
}
