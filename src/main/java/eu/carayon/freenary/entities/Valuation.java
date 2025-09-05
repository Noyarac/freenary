package eu.carayon.freenary.entities;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Valuation {
    private LocalDate date;
    private BigDecimal buyPrice;
    private BigDecimal sellPrice;
}
