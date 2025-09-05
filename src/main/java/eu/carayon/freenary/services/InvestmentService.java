package eu.carayon.freenary.services;

import java.util.Set;

import org.springframework.stereotype.Service;

import eu.carayon.freenary.entities.Investment;
import eu.carayon.freenary.repositories.InvestmentRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InvestmentService {
    private final InvestmentRepository investmentRepository;

    public Set<Investment> getAll() {
        return this.investmentRepository.getAll();
    }

}
