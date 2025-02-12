package pl.lodz.p.edu.ProjektOro.entitis;

import javax.persistence.*;

@Entity
public class CinemaRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int number_rows;
    private int number_columns;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getNumber_rows() {
        return number_rows;
    }

    public void setNumber_rows(int number_rows) {
        this.number_rows = number_rows;
    }

    public int getNumber_columns() {
        return number_columns;
    }

    public void setNumber_columns(int number_columns) {
        this.number_columns = number_columns;
    }

}
