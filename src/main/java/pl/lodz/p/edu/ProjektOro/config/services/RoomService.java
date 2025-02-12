package pl.lodz.p.edu.ProjektOro.config.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.lodz.p.edu.ProjektOro.config.repositoris.ChairRepository;
import pl.lodz.p.edu.ProjektOro.config.repositoris.ReservationRepository;
import pl.lodz.p.edu.ProjektOro.config.repositoris.RoomRepository;
import pl.lodz.p.edu.ProjektOro.entitis.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    public CinemaRoom save(CinemaRoom newRoom){
        return roomRepository.save(newRoom);
    }

    public  Optional<CinemaRoom> findById(Long roomId) {
        return roomRepository.findById(roomId);
    }

    public  Optional<CinemaRoom> findByName(String roomName) {
        return roomRepository.findByName(roomName);
    }

    public  List<CinemaRoom> findAll() {
        return roomRepository.findAll();
    }

}
