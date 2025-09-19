package eu.carayon.freenary.entities;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Data
@NoArgsConstructor
public abstract class Investment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @OneToMany(mappedBy = "investment", cascade = CascadeType.ALL) @JsonManagedReference private Set<Movement> movements = new HashSet<>();
    @OneToMany(mappedBy = "investment", cascade = CascadeType.ALL) @JsonManagedReference private Set<Valuation> valuations = new HashSet<>();

    private String name;

    public Investment(String name) {
        this.name = name;
    }

    public void addMovement(Movement movement) {
        this.movements.add(movement);
    }

    public void removeMovement(Movement movement) {
        this.movements.remove(movement);
    }
    
    public void addValuation(Valuation valuation) {
        this.valuations.add(valuation);
    }

    public void removeValuation(Valuation valuation) {
        this.valuations.remove(valuation);
    }
    
}
