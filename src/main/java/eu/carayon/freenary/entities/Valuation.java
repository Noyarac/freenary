package eu.carayon.freenary.entities;

import java.math.BigDecimal;
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
public class Valuation {
    @Id @GeneratedValue(strategy = GenerationType.AUTO) private Long id;
    private LocalDate date;
    private BigDecimal buyPrice;
    private BigDecimal sellPrice;
    @ManyToOne @JsonBackReference private Investment investment;
    public Valuation(LocalDate date, BigDecimal buyPrice, BigDecimal sellPrice, Investment investment) {
        this.date = date;
        this.buyPrice = buyPrice;
        this.sellPrice = sellPrice;
        this.investment = investment;
    }
    
}
