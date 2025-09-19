package eu.carayon.freenary.entities;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(exclude = {"investment"})
public class Movement {
    @Id @GeneratedValue(strategy = GenerationType.AUTO) private Long id;
    private LocalDate date;
    private double quantity;
    @ManyToOne @JsonBackReference private Investment investment;

    public Movement(LocalDate date, double quantity, Investment investment) {
        this.date = date;
        this.quantity = quantity;
        this.investment =  investment;
    }

}
