package eu.carayon.freenary.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import eu.carayon.freenary.dtos.InvestmentDto;
import eu.carayon.freenary.services.InvestmentService;
import lombok.RequiredArgsConstructor;

import java.util.Map;
import java.util.Set;

import org.springframework.web.bind.annotation.DeleteMapping;
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
    public InvestmentDto getById(@PathVariable("id") Long id) {
        return investmentService.getById(id);
    }

    @DeleteMapping("/{id}")
    public Map<String, String> deleteById(@PathVariable("id") Long id) {
        return investmentService.deleteById(id) ? Map.of("status", "ok") : Map.of("status", "error");
    }

}
