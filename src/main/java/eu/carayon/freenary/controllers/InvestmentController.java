package eu.carayon.freenary.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import eu.carayon.freenary.dtos.InvestmentDto;
import eu.carayon.freenary.services.InvestmentService;
import lombok.RequiredArgsConstructor;

import java.util.Set;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/investment")
@RequiredArgsConstructor
public class InvestmentController {
    private final InvestmentService investmentService;

    @GetMapping("/all")
    public Set<InvestmentDto> getAll() {
        return investmentService.getAll();
    }
    @GetMapping("/{id}")
    public InvestmentDto getById(@PathVariable Long id) {
        return investmentService.getById(id);
    }

}
