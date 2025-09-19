package eu.carayon.freenary.configurations;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import eu.carayon.freenary.entities.Movement;
import eu.carayon.freenary.entities.Scpi;
import eu.carayon.freenary.entities.UserEntity;
import eu.carayon.freenary.entities.Valuation;
import eu.carayon.freenary.repositories.ScpiRepository;
import eu.carayon.freenary.repositories.UserRepository;

@Configuration
public class DataLoader {
    @Bean
    CommandLineRunner initDatabase(
            ScpiRepository scpiRepository,
            UserRepository userRepository) {
        return args -> {
            List<Scpi> scpis = List.of(
                new Scpi("Eurion", "Corum"),
                new Scpi("Grand Paris", "Perial")
            );
            scpis.get(0).addMovement(new Movement((LocalDate.now()).minusYears(1), 139.53488, scpis.get(0)));
            scpis.get(0).addValuation(new Valuation((LocalDate.now()).minusYears(1), BigDecimal.valueOf(215), BigDecimal.valueOf(189.20), scpis.get(0)));
            scpis.get(1).addMovement(new Movement((LocalDate.now()).minusYears(1), 100, scpis.get(1)));
            scpis.get(1).addValuation(new Valuation((LocalDate.now()).minusYears(1), BigDecimal.valueOf(215), BigDecimal.valueOf(189.20), scpis.get(1)));


            scpiRepository.saveAll(scpis);
            userRepository.save(
                    new UserEntity(null, "benjamin", "$2a$12$jyWP/TIdu2YrhmefH8Wi/OnW1Y7sSU9XmvVztRwUUmSaHaz2IAsu."));
        };
    }
}
