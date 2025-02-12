package pl.lodz.p.edu.ProjektOro;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.lodz.p.edu.ProjektOro.config.services.DefaultEmailService;
import pl.lodz.p.edu.ProjektOro.config.services.userDetailsServiceImp;
import pl.lodz.p.edu.ProjektOro.entitis.User;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private userDetailsServiceImp userService;
    @Autowired
    private DefaultEmailService defaultEmailService;

    @PostMapping("")
    public ResponseEntity<?> createUser(@RequestBody User user){
        User newUser = userService.save(user);
        return ResponseEntity.ok(newUser);
    }

    @GetMapping("{userName}")
    public ResponseEntity<?> getUserByName(@PathVariable String userName){
        User newUser = (User) userService.loadUserByUsername(userName);
        return ResponseEntity.ok(newUser);
    }

    @PutMapping("{userName}")
    public ResponseEntity<?> changePassword(@PathVariable String userName, @RequestBody String newPassword){
        User userToChange = (User) userService.loadUserByUsername(userName);
        newPassword = newPassword.replace('"', ' ').trim();
        userToChange.setPassword(newPassword);
        User newUser = userService.save(userToChange);
        return ResponseEntity.ok(newUser);
    }

    @PostMapping("resetEmail")
    public ResponseEntity<?> resetEmailPassword(@RequestBody String email){
        String url = "http://localhost:3000/PassReset";
        email = email.replace('"', ' ').trim();
        User newUser = userService.findByEmail(email);
        if(newUser == null)
            return ResponseEntity.ok( false );

        url += "/" + newUser.getUserName();
        defaultEmailService.sendSimpleEmail(email, "Reset your password", url);
        return ResponseEntity.ok( true );
    }



}
