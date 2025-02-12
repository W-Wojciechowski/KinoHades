package pl.lodz.p.edu.ProjektOro;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import pl.lodz.p.edu.ProjektOro.config.services.ChairService;
import pl.lodz.p.edu.ProjektOro.config.services.RoomService;
import pl.lodz.p.edu.ProjektOro.entitis.Chair;
import pl.lodz.p.edu.ProjektOro.entitis.ChairSendPack;
import pl.lodz.p.edu.ProjektOro.entitis.CinemaRoom;
import pl.lodz.p.edu.ProjektOro.entitis.User;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping("")
    public ResponseEntity<?> createRoom(@RequestBody CinemaRoom cinemaRoom){
        return ResponseEntity.ok( roomService.save(cinemaRoom));
    }
    @GetMapping("{RoomId}")
    public ResponseEntity<?> getRoom(@PathVariable Long RoomId){
        return ResponseEntity.ok(  roomService.findById(RoomId) );
    }

    @GetMapping("/name/{RoomName}")
    public ResponseEntity<?> getRoomByName(@PathVariable String RoomName){
        return ResponseEntity.ok(  roomService.findByName(RoomName) );
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllRooms(){
        return ResponseEntity.ok(  roomService.findAll() );
    }
}
