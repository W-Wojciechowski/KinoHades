package pl.lodz.p.edu.ProjektOro;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import pl.lodz.p.edu.ProjektOro.config.services.ChairService;
import pl.lodz.p.edu.ProjektOro.entitis.Chair;
import pl.lodz.p.edu.ProjektOro.entitis.ChairSendPack;
import pl.lodz.p.edu.ProjektOro.entitis.User;

import java.util.List;

@RestController
@RequestMapping("/api/chairs")
public class ChairController {

    @Autowired
    private ChairService chairService;

    @PostMapping("")
    public ResponseEntity<?> createChair(@RequestBody ChairSendPack chairSendPack, @AuthenticationPrincipal User user){
        Chair newChair = chairService.save(chairSendPack);
        return ResponseEntity.ok(newChair);
    }
    @GetMapping("{ReservationId}")
    public ResponseEntity<?> getChair(@PathVariable Long ReservationId,  @AuthenticationPrincipal User user){
        List<Chair> chairOpt = chairService.findByReservation(ReservationId);
        return ResponseEntity.ok( chairOpt );
    }

    @GetMapping("")
    public ResponseEntity<?> getChair( @AuthenticationPrincipal User user){
        return ResponseEntity.ok( chairService.findByUser(user) );
    }

    @DeleteMapping("{ReservationId}")
    public ResponseEntity<?> deleteChair(@PathVariable Long ReservationId,  @AuthenticationPrincipal User user){
        List<Chair> chairOpt = chairService.findByReservation(ReservationId);
        chairService.deleteAllFromReservation(ReservationId);
        return ResponseEntity.ok( chairOpt );
    }


    @PutMapping("{ChairId}")
    public ResponseEntity<?> reserveChair(@PathVariable Long ChairId, @RequestBody Chair chair, @AuthenticationPrincipal User user){
        chair.setUser(user);
        chair.setId(ChairId);
        chair.setStatus("Zajęte");
        Chair newChair = chairService.save(chair);
        return ResponseEntity.ok(newChair);
    }

    @PutMapping("/cancel/{ChairId}")
    public ResponseEntity<?> cancelChair(@PathVariable Long ChairId, @RequestBody Chair chair){
        chair.setUser(null);
        chair.setStatus("Wolne");
        Chair newChair = chairService.save(chair);
        return ResponseEntity.ok(newChair);
    }

}
