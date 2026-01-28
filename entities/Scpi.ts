import { ChildEntity } from "typeorm"
import Investment from "@/entities/Investment"
import InvestmentInterface from "@/types/Investment"
import ScpiProviderWrapper from "@/prodivers/ScpiProvider"
import InvestmentProvider from "@/types/InvestmentProvider"

@ChildEntity()
export default class Scpi extends Investment implements InvestmentInterface {
    get provider(): InvestmentProvider { return ScpiProviderWrapper(this) }
}