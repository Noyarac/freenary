package eu.carayon.freenary.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import eu.carayon.freenary.entities.Investment;
import eu.carayon.freenary.services.InvestmentService;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/investment")
@RequiredArgsConstructor
public class InvestmentController {
    private final InvestmentService investmentService;

    @GetMapping("/all")
    public Map<String, Set<Investment>> getAll() {
        Map<String, Set<Investment>> jsonResponse = new HashMap<>();
        jsonResponse.put("results", investmentService.getAll());
        return jsonResponse;
    }
    

}
