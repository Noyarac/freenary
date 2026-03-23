import { getRepository } from "@/configurations/ormConfig"
import Investment from "@/entities/Investment"
import InvestmentDTO from "@/types/InvestmentDTO"
import InvestmentInterface from "@/types/Investment"
import { In } from "typeorm"
import { InvestmentSubTypeName } from "@/types/InvestmentSubType"
import Scpi from "@/entities/Scpi"
import Stock from "@/entities/Stock"
import Livret from "@/entities/Livret"

export default {
    repository: await getRepository(Investment),

    async getInvestments({ ids, detailed }: { ids?: string[], detailed?: boolean }): Promise<InvestmentDTO[]> {
        const whereClause = ids ? { id: In(ids) } : {}
        const investments = (await this.repository.findBy(whereClause)) as InvestmentInterface[]

        return Promise.all(investments.map(async investment => {
            const invested = this._getInvestedOrQuantity("price", investment)
            let name, value, dividendsPerMonth, latentCapitalGain, performance
            if (detailed) {
                const quantity = this._getInvestedOrQuantity("quantity", investment)
                const details = await investment.provider.find()
                name = details.name
                value = details.unitValue * quantity
                dividendsPerMonth = details.unitYearlyDividends * quantity / 12
                latentCapitalGain = details.unitLatentCapitalGain * quantity / 12
                performance = (details.unitYearlyDividends + details.unitLatentCapitalGain) * quantity / invested
            }
            return {
                id: investment.id,
                type: investment.constructor.name,
                invested: invested,
                name,
                value,
                dividendsPerMonth,
                latentCapitalGain,
                performance
            } as InvestmentDTO
        }))
    },

    async saveInvestment(id: string, type: InvestmentSubTypeName) {
        const existingInvestment = await this.repository.findOneBy({ id })
        const investment = existingInvestment ?? this._createInvestment(type)
        investment.id = id
        await this.repository.save(investment)
        return investment
    },

    async deleteInvestments(ids: string[]) {
        this.repository.delete(ids)
    },

    _getInvestedOrQuantity(mode: "price" | "quantity", investment: Investment) {
        return investment.movements
            .map(investment => investment[mode])
            .reduce((previous, current) => previous + current, 0)
    },

    _createInvestment(type?: InvestmentSubTypeName) {
    switch(type) {
        case "Scpi": return new Scpi()
        case "Stock": return new Stock()
        case "Livret": return new Livret()
        default: return new Investment()
    }
}

}
