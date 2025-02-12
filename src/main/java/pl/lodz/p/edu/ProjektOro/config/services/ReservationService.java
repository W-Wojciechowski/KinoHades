package pl.lodz.p.edu.ProjektOro.config.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.lodz.p.edu.ProjektOro.config.repositoris.ReservationRepository;
import pl.lodz.p.edu.ProjektOro.entitis.Reservation;
import pl.lodz.p.edu.ProjektOro.entitis.User;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;
    private static final String imageDirectory = System.getProperty("user.dir") + "/src/my-app/src/img/bookImages";

    public  Optional<Reservation> findById(Long ReservationId) {
        return reservationRepository.findById(ReservationId);
    }

    public Reservation save(User user){
        Reservation reservation = new Reservation();
        reservation.setUser(user);
        reservation.setMovieName("---");
        reservation.setImagePath("---");
        reservation.setStartHour("00:00");
        reservation.setDescription("No description");

        reservation.setDate(Date.valueOf("2023-7-1"));
        return reservationRepository.save(reservation);
    }

    public Reservation save(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    public Set<Reservation> findByUser(User user){
        return reservationRepository.findByUser(user);
    }

    public List<Reservation> findAll(){
        return  reservationRepository.findAll();
    }

    public void delete(Long id){
        reservationRepository.deleteById(id);
    }

    public Reservation uploadImg(Long reservationId, MultipartFile file) {

        Reservation reservation = findById(reservationId).orElse(null);
        if(file.getOriginalFilename() == null || reservation == null) return null;
        makeDirectoryIfNotExist(imageDirectory);

        Path fileNamePath = Paths.get(imageDirectory, file.getOriginalFilename());
        reservation.setImagePath(file.getOriginalFilename());
        try {
            Files.write(fileNamePath, file.getBytes());
        } catch (IOException ex) {
            return null;
        }
        reservationRepository.save(reservation);
        return reservation;
    }

    private void makeDirectoryIfNotExist(String imageDirectory) {
        File directory = new File(imageDirectory);
        if (!directory.exists()) {
            directory.mkdir();
        }
    }

    public List<Reservation> findByDate(Date reservationDate) {
        return  reservationRepository.findByDate(reservationDate);
    }
}
