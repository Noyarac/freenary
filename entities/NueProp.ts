import { ChildEntity } from "typeorm"
import InvestmentInterface from "@/types/Investment"
import InvestmentProvider from "@/types/InvestmentProvider"
import ScpiProviderWrapper from "@/prodivers/ScpiProvider"
import Scpi from "./Scpi"

@ChildEntity()
export default class NueProp extends Scpi implements InvestmentInterface {
    get provider(): InvestmentProvider { return ScpiProviderWrapper(this, true) }
}