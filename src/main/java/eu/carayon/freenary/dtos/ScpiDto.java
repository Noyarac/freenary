package eu.carayon.freenary.dtos;

import org.springframework.util.StringUtils;

import eu.carayon.freenary.entities.Scpi;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class ScpiDto extends InvestmentDto{
    private String issuer;
    public ScpiDto() {
        this.setType("scpi");
    }

    public Scpi toEntity() {
        return this.toEntity(new Scpi());
    }

    public Scpi toEntity(Scpi scpi) {
        if (this.getId() != 0) scpi.setId(this.getId());
        if (StringUtils.hasText(this.getIssuer())) scpi.setIssuer(this.getIssuer());
        if (StringUtils.hasText(this.getName())) scpi.setName(this.getName());
        return scpi;
    }

}
