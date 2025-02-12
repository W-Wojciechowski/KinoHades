package pl.lodz.p.edu.ProjektOro.config.repositoris;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.lodz.p.edu.ProjektOro.entitis.Chair;
import pl.lodz.p.edu.ProjektOro.entitis.CinemaRoom;
import pl.lodz.p.edu.ProjektOro.entitis.Reservation;
import pl.lodz.p.edu.ProjektOro.entitis.User;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface RoomRepository extends JpaRepository<CinemaRoom, Long> {
    Optional<CinemaRoom> findByName(String name);
}
