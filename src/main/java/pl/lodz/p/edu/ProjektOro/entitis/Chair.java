package pl.lodz.p.edu.ProjektOro.entitis;

import org.springframework.lang.Nullable;

import javax.persistence.*;

@Entity
public class Chair {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private User user;
    private String status;
    private int row_t;
    private int col_t;
    @ManyToOne(optional = false)
    private Reservation reservation;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getRow() {
        return row_t;
    }

    public void setRow(int row) {
        this.row_t = row;
    }

    public int getCol() {
        return col_t;
    }

    public void setCol(int col) {
        this.col_t = col;
    }

    public Reservation getReservation() {
        return reservation;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
    }


}
