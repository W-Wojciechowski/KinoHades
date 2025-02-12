package pl.lodz.p.edu.ProjektOro.config.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.lodz.p.edu.ProjektOro.config.repositoris.ChairRepository;
import pl.lodz.p.edu.ProjektOro.config.repositoris.ReservationRepository;
import pl.lodz.p.edu.ProjektOro.entitis.Chair;
import pl.lodz.p.edu.ProjektOro.entitis.ChairSendPack;
import pl.lodz.p.edu.ProjektOro.entitis.Reservation;
import pl.lodz.p.edu.ProjektOro.entitis.User;


import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ChairService {

    @Autowired
    private ChairRepository chairRepository;
    @Autowired
    private ReservationRepository reservationRepository;

    public  Optional<Chair> findById(Long ReservationId) {
        return chairRepository.findById(ReservationId);
    }

    public Chair save(ChairSendPack chairSendPack){
        Chair newChair = new Chair();
        newChair.setReservation(chairSendPack.getReservation());
        newChair.setCol(chairSendPack.getCol_t());
        newChair.setRow(chairSendPack.getRow_t());
        newChair.setStatus("Wolne");
        return chairRepository.save(newChair);
    }

    public Chair save(Chair newChair){
        return chairRepository.save(newChair);
    }

    public List<Chair> findByReservation(Long reservationId){
        Optional<Reservation> reservation = reservationRepository.findById(reservationId);
        return chairRepository.findAllSortedByReservation( reservation.orElse(new Reservation()));
    }

    public Set<Chair> findByUser(User user){
        return chairRepository.findByUser(user);
    }

    public List<Chair> findAll(){
        return  chairRepository.findAll();
    }

    public void deleteAllFromReservation(Long reservationId) {
        Optional<Reservation> reservation = reservationRepository.findById(reservationId);
        List<Chair> chairSet = chairRepository.findByReservation(reservation.orElse(new Reservation()));
        chairRepository.deleteAll(chairSet);
    }
}
