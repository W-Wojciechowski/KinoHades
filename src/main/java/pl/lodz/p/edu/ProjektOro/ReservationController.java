package pl.lodz.p.edu.ProjektOro;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.lodz.p.edu.ProjektOro.config.services.ReservationService;
import pl.lodz.p.edu.ProjektOro.entitis.Reservation;
import pl.lodz.p.edu.ProjektOro.entitis.User;

import java.sql.Date;
import java.util.Optional;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

        @Autowired
        private ReservationService reservationService;

        @PostMapping("")
        public ResponseEntity<?> createReservation(@AuthenticationPrincipal User user){
            Reservation newReservation = reservationService.save(user);
            return ResponseEntity.ok(newReservation);
        }

        @GetMapping("")
        public ResponseEntity<?> getReservations(@AuthenticationPrincipal User user){
            return ResponseEntity.ok( reservationService.findAll() );
        }

        @GetMapping("/dateSearch/{ReservationDate}")
        public ResponseEntity<?> getReservationByDate(@PathVariable Date ReservationDate, @AuthenticationPrincipal User user){
            return ResponseEntity.ok( reservationService.findByDate(ReservationDate) );
        }

        @GetMapping("{ReservationId}")
        public ResponseEntity<?> getReservation(@PathVariable Long ReservationId, @AuthenticationPrincipal User user){
            Optional<Reservation> reservationOpt = reservationService.findById(ReservationId);
            return ResponseEntity.ok( reservationOpt.orElse(new Reservation()) );
        }

        @PutMapping("{ReservationId}")
        public ResponseEntity<?> updateReservation(@PathVariable Long ReservationId, @RequestBody Reservation reservation, @AuthenticationPrincipal User user){
            return ResponseEntity.ok( reservationService.save(reservation) );
        }

        @PutMapping("/uploadImg/{ReservationId}")
        public ResponseEntity<?> uploadImg(@PathVariable Long ReservationId, @RequestParam("file") MultipartFile file){
            return ResponseEntity.ok( reservationService.uploadImg(ReservationId, file) );
        }

        @DeleteMapping ("{ReservationId}")
        public ResponseEntity<?> deleteReservation(@PathVariable Long ReservationId, @AuthenticationPrincipal User user){
            reservationService.delete(ReservationId);
            return ResponseEntity.ok( true );
        }

    }
