import { getRepository } from "@/configurations/ormConfig"
import Investment from "@/entities/Investment"
import InvestmentDTO from "@/types/InvestmentDTO"
import InvestmentInterface from "@/types/Investment"
import { In } from "typeorm"

export default {
    repository: await getRepository(Investment),

    async getInvestments({ ids, detailed }: { ids?: string[], detailed?: boolean }): Promise<InvestmentDTO[]> {
        const whereClause = ids ? { id: In(ids) } : {}
        const investments = (await this.repository.findBy(whereClause)) as InvestmentInterface[]

        return Promise.all(investments.map(async investment => {
            let name, value, dividendsPerMonth
            if (detailed) {
                const quantity = this._getInvestedOrQuantity("quantity", investment)
                const details = await investment.provider.find()
                name = details.name
                value = details.unitValue * quantity
                dividendsPerMonth = details.unitYearlyDividends * quantity / 12
            }
            return {
                id: investment.id,
                type: investment.constructor.name,
                invested: this._getInvestedOrQuantity("price", investment),
                name,
                value,
                dividendsPerMonth
            } as InvestmentDTO
        }))
    },

    _getInvestedOrQuantity(mode: "price" | "quantity", investment: Investment) {
        return investment.movements
            .map(investment => investment[mode])
            .reduce((previous, current) => previous + current, 0)
    },
}
