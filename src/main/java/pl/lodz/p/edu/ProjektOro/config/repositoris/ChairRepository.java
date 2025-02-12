package pl.lodz.p.edu.ProjektOro.config.repositoris;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.lodz.p.edu.ProjektOro.entitis.Chair;
import pl.lodz.p.edu.ProjektOro.entitis.Reservation;
import pl.lodz.p.edu.ProjektOro.entitis.User;

import java.util.List;
import java.util.Set;

@Repository
public interface ChairRepository extends JpaRepository<Chair, Long> {
    List<Chair> findByReservation(Reservation reservation);
    Set<Chair> findByUser(User user);
    @Query("SELECT u FROM Chair u WHERE u.reservation = ?1 ORDER BY u.row_t, u.col_t")
    List<Chair> findAllSortedByReservation( Reservation reservationToGet );
}
