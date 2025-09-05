package eu.carayon.freenary.configurations;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import eu.carayon.freenary.entities.Scpi;
import eu.carayon.freenary.repositories.ScpiRepository;

@Configuration
public class DataLoader {
    @Bean
    CommandLineRunner initDatabase(
        ScpiRepository scpiRepository
    ) {
        return args -> {
            scpiRepository.saveAll(List.of(
                new Scpi("Eurion", "Corum"),
                new Scpi("Grand Paris", "Perial")
            ));
        };
    }
}
