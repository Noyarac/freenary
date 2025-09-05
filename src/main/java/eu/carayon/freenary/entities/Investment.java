package eu.carayon.freenary.entities;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;

@MappedSuperclass
@Data
@NoArgsConstructor
public abstract class Investment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToMany private Set<Movement> movements = new HashSet<>();
    @OneToMany private Set<Valuation> valuations = new HashSet<>();

    private String name;

    public Investment(String name) {
        this.name = name;
    }
    
}
