package eu.carayon.freenary.configurations;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import eu.carayon.freenary.entities.Scpi;
import eu.carayon.freenary.entities.UserEntity;
import eu.carayon.freenary.repositories.ScpiRepository;
import eu.carayon.freenary.repositories.UserRepository;

@Configuration
public class DataLoader {
    @Bean
    CommandLineRunner initDatabase(
        ScpiRepository scpiRepository,
        UserRepository userRepository
    ) {
        return args -> {
            scpiRepository.saveAll(List.of(
                new Scpi("Eurion", "Corum"),
                new Scpi("Grand Paris", "Perial")
            ));
            userRepository.save(
                new UserEntity("benjamin", "$2a$12$jyWP/TIdu2YrhmefH8Wi/OnW1Y7sSU9XmvVztRwUUmSaHaz2IAsu.")
            );
        };
    }
}
