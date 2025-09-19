package eu.carayon.freenary.services;

import org.springframework.stereotype.Service;

import eu.carayon.freenary.dtos.ScpiDto;
import eu.carayon.freenary.repositories.ScpiRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ScpiService {
    private final ScpiRepository scpiRepository;

    public void save(ScpiDto scpiDto) {
        scpiRepository.save(scpiDto.toEntity());
    }

}
