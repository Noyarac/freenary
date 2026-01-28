import type InvestmentClass from "@/entities/Investment"
import InvestmentProvider from "@/types/InvestmentProvider"

export default interface Investment extends InvestmentClass {
    provider: InvestmentProvider
}