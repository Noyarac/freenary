package eu.carayon.freenary.repositories;

import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Repository;

import eu.carayon.freenary.entities.Investment;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class InvestmentRepository {
    private final ScpiRepository scpiRepository;

    public Set<Investment> getAll() {
        return new HashSet<>(this.scpiRepository.findAll());
    }
}
