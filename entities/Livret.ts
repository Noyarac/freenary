import { ChildEntity } from "typeorm"
import Investment from "@/entities/Investment"
import InvestmentInterface from "@/types/Investment"
import InvestmentProvider from "@/types/InvestmentProvider"
import LivretProviderWrapper from "@/prodivers/LivretProvider"

@ChildEntity()
export default class Livret extends Investment implements InvestmentInterface {
    get provider(): InvestmentProvider { return LivretProviderWrapper(this) }
}