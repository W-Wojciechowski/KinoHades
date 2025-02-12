package pl.lodz.p.edu.ProjektOro.config.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.lodz.p.edu.ProjektOro.config.repositoris.AuthorityRepository;
import pl.lodz.p.edu.ProjektOro.config.repositoris.UserRepository;
import pl.lodz.p.edu.ProjektOro.entitis.Authority;
import pl.lodz.p.edu.ProjektOro.entitis.User;

import java.util.Optional;

@Service
public class userDetailsServiceImp implements UserDetailsService {

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private AuthorityRepository authoRepo;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> optUser = userRepo.findByUserName(username);
        return optUser.orElseThrow(() -> new UsernameNotFoundException("Invalid name"));
    }

    public User save(User user) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setPassword( passwordEncoder.encode(user.getPassword()) );
        Authority standard = new Authority("ROLE_STANDARD_USER");
        user.setAuthority(standard);
        authoRepo.save(standard);
        return userRepo.save(user);
    }

    public  User findByEmail(String email) {
        return userRepo.findByEmail(email).orElse( null);
    }

}
