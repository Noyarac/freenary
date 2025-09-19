package eu.carayon.freenary.dtos;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InvestmentDto {
    private String name;
    private BigDecimal invested;
    private double weight;
    private double performance;
    private String type;
    private int error = 0;
}
