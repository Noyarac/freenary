package eu.carayon.freenary.repositories;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import eu.carayon.freenary.entities.Investment;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class InvestmentRepository {
    private final ScpiRepository scpiRepository;

    public Set<Investment> getAll() {
        return this.scpiRepository.findAll().stream()
            .map(scpi -> (Investment) scpi)
            .collect(Collectors.toSet());
    }
}
