import { ChildEntity } from "typeorm"
import Investment from "@/entities/Investment"
import InvestmentInterface from "@/types/Investment"
import InvestmentProvider from "@/types/InvestmentProvider"
import StockProviderWrapper from "@/prodivers/StockProvider"

@ChildEntity()
export default class Stock extends Investment implements InvestmentInterface {
    get provider(): InvestmentProvider { return StockProviderWrapper(this) }
}