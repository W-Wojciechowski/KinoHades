package pl.lodz.p.edu.ProjektOro.entitis;

public class ChairSendPack {
    private Reservation reservation;
    private int row_t;
    private int col_t;

    public Reservation getReservation() {
        return reservation;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
    }

    public int getRow_t() {
        return row_t;
    }

    public void setRow_t(int row_t) {
        this.row_t = row_t;
    }

    public int getCol_t() {
        return col_t;
    }

    public void setCol_t(int col_t) {
        this.col_t = col_t;
    }


}
