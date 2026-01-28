import { getRepository } from "@/configurations/ormConfig"
import Investment from "@/entities/Investment"
import InvestmentDTO from "@/types/InvestmentDTO"
import InvestmentInterface from "@/types/Investment"

export default {
    repository: await getRepository(Investment),

    async getJsonForAll(): Promise<InvestmentDTO[]> {
        const investments = await this.repository.find()
        return Promise.all((investments as InvestmentInterface[])
            .map(async (investment) => {
                const { unitValue, unitYearlyDividends, name } = await investment.provider.find()
                const quantity = this._getInvestedOrQuantity("quantity", investment)
                return {
                    id: investment.id,
                    type: investment.constructor.name,
                    invested: this._getInvestedOrQuantity("price", investment),
                    selected: true,
                    value: unitValue * quantity,
                    dividendsPerMonth: unitYearlyDividends * quantity / 12,
                    name,
                }
            }))
    },

    _getInvestedOrQuantity(mode: "price" | "quantity", investment: Investment) {
        return investment.movements
            .map(investment => investment[mode])
            .reduce((previous, current) => previous + current, 0)
    },
}
