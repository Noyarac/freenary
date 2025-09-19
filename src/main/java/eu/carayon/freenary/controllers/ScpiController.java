package eu.carayon.freenary.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import eu.carayon.freenary.dtos.ScpiDto;
import eu.carayon.freenary.services.ScpiService;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/investment/scpi")
@RequiredArgsConstructor
public class ScpiController {
    private final ScpiService scpiService;

    @PostMapping("/save")
    public void save(@RequestBody ScpiDto scpiDto) {
        scpiService.save(scpiDto);
    }
    
    // @GetMapping("/all")
    // public Set<InvestmentDto> getAll() {
    //     return investmentService.getAll();
    // }
    // @GetMapping("/{id}")
    // public InvestmentDto getById(@PathVariable("id") Long id) {
    //     return investmentService.getById(id);
    // }

    // @DeleteMapping("/{id}")
    // public Map<String, String> deleteById(@PathVariable("id") Long id) {
    //     return investmentService.deleteById(id) ? Map.of("status", "ok") : Map.of("status", "error");
    // }

}
