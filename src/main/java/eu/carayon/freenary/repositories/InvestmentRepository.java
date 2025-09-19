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

    public Investment getById(Long id) {
        return this.scpiRepository.getReferenceById(id);
    }

    public boolean deleteById(Long id) {
        this.scpiRepository.deleteById(id);
        return true;
    }
}
