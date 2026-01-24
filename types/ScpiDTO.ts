import Scpi from "@/entities/Scpi"
import { InvestmentDTO } from "./InvestmentDTO"

type ScpiProperties = {
    [K in keyof Scpi as Scpi[K] extends Function ? never : K]: Scpi[K]
}

export interface ScpiDTO extends ScpiProperties, InvestmentDTO {
}