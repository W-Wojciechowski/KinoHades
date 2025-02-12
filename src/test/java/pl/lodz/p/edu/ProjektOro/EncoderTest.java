package pl.lodz.p.edu.ProjektOro;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class EncoderTest {
    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    @Test
    public void encPass() {
        System.out.println(passwordEncoder.encode("abcd"));
    }
}
