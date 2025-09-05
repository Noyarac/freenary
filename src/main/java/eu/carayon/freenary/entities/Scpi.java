package eu.carayon.freenary.entities;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class Scpi extends Investment {
    private String issuer;

    public Scpi(String name, String issuer) {
        super(null, name, null, null);
        this.issuer = issuer;
    }
    
}
