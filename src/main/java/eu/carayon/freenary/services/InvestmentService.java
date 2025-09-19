package eu.carayon.freenary.services;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import eu.carayon.freenary.dtos.InvestmentDto;
import eu.carayon.freenary.entities.Investment;
import eu.carayon.freenary.entities.Movement;
import eu.carayon.freenary.entities.Scpi;
import eu.carayon.freenary.entities.Valuation;
import eu.carayon.freenary.repositories.InvestmentRepository;
import eu.carayon.freenary.repositories.ValuationRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InvestmentService {
    private final InvestmentRepository investmentRepository;
    private final ValuationRepository valuationRepository;

    public Set<InvestmentDto> getAll() {
        return investmentRepository.getAll()
                .stream()
                .map(investment -> getInvestmentDto(investment))
                .collect(Collectors.toSet());
    }

    public InvestmentDto getById(Long id) {
        Investment investment = this.investmentRepository.getById(id);
        return this.getInvestmentDto(investment);
    }

    private Optional<BigDecimal> getInvested(Investment investment) {
        BigDecimal invested = BigDecimal.ZERO;
        for (Movement movement : investment.getMovements()) {
            Optional<Valuation> optionalValuation = valuationRepository.findClosestValuation(investment.getId(), movement.getDate());
            if (optionalValuation.isEmpty()) return Optional.empty();
            invested = invested.add(optionalValuation.get().getBuyPrice().multiply(BigDecimal.valueOf(movement.getQuantity())));
        }
        return Optional.of(invested);
    }

    private InvestmentDto getInvestmentDto(Investment investment) {
        InvestmentDto investmentDto = new InvestmentDto();
        investmentDto.setId(investment.getId());
        investmentDto.setName(investment.getName());
        investmentDto.setPerformance(1.0);
        investmentDto.setType(investment instanceof Scpi ? "scpi" : "unknown");
        investmentDto.setWeight(1);
        this.getInvested(investment).ifPresentOrElse(invested -> {
            investmentDto.setInvested(invested);
            investmentDto.setError(0);
        }, () -> {
            investmentDto.setInvested(BigDecimal.ZERO);
            investmentDto.setError(1);
        });
        return investmentDto;
    }

    public boolean deleteById(Long id) {
        investmentRepository.deleteById(id);
        return investmentRepository.getById(id) instanceof Investment;
    }

}
