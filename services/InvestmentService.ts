import { getRepository } from "@/configurations/ormConfig"
import Investment from "@/entities/Investment"
import InvestmentDTO from "@/types/InvestmentDTO"
import InvestmentInterface from "@/types/Investment"
import { In } from "typeorm"
import { InvestmentSubTypeName } from "@/types/InvestmentSubType"
import Scpi from "@/entities/Scpi"
import Stock from "@/entities/Stock"
import Livret from "@/entities/Livret"
import constants from "@/configurations/constants"

export default {
    repository: await getRepository(Investment),

    async getInvestments({ ids, detailed }: { ids?: string[], detailed?: boolean }): Promise<InvestmentDTO[]> {
        const whereClause = ids ? { id: In(ids) } : {}
        const investments = (await this.repository.findBy(whereClause)) as InvestmentInterface[]

        return Promise.all(investments.map(async investment => {
            const invested = this._getInvestedOrQuantity("price", investment)
            let name, value, dividendsPerMonth, latentCapitalGain, performance, expectedPerformance
            if (detailed) {
                const quantity = this._getInvestedOrQuantity("quantity", investment)
                const details = await investment.provider.find()
                name = details.name
                value = details.unitValue * quantity
                dividendsPerMonth = details.unitYearlyDividends * quantity / 12
                const years = (new Date().valueOf() - new Date(constants.START_DATE).valueOf()) / constants.MILLISECONDS_IN_YEAR
                latentCapitalGain = details.unitLatentCapitalGain * quantity / 12 / (investment.constructor.name === "Stock" ? years : 1)
                performance = investment.constructor.name === "Stock" ?
                    (details.unitValue / (details.unitValue - details.unitLatentCapitalGain)) ** (1 / years) - 1
                    : (details.unitYearlyDividends + details.unitLatentCapitalGain) * quantity / invested
                expectedPerformance = details.expectedPerformance
            }
            return {
                id: investment.id,
                type: investment.constructor.name,
                enableDividend: investment.enableDividend,
                invested: invested,
                name,
                value,
                dividendsPerMonth,
                latentCapitalGain,
                performance,
                expectedPerformance,
                movements: investment.movements.map(entity => ({...entity, investmentId: entity.investment?.id, investment: undefined})),
                splits: investment.splits.map(entity => ({...entity, investmentId: entity.investment?.id, investment: undefined}))
            } as InvestmentDTO
        }))
    },

    async saveInvestment(id: string, type: InvestmentSubTypeName, enableDividend: boolean) {
        const existingInvestment = await this.repository.findOneBy({ id })
        const investment = existingInvestment ?? this._createInvestment(type)
        investment.id = id
        investment.enableDividend = enableDividend
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
