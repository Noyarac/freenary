import { getRepository } from "@/configurations/ormConfig"
import Investment from "@/entities/Investment"
import InvestmentDTO from "@/types/InvestmentDTO"
import InvestmentInterface from "@/types/Investment"
import { In } from "typeorm"

type InvestmentBasicDTO = {
  id: string
  type: string
  invested: number
  selected: boolean
}

type InvestmentDetailsDTO = {
  value: number
  dividendsPerMonth: number
  name: string
}

export type InvestmentResultMap = {
  basic: InvestmentBasicDTO
  details: InvestmentDetailsDTO
}

export default {
    repository: await getRepository(Investment),

    async getInvestments<T extends keyof InvestmentResultMap>(mode: T, ids?: string[]): Promise<InvestmentResultMap[T][]> {
        const whereClause = ids ? { id: In(ids) } : {}
        const investments = await this.repository.findBy(whereClause)

        const getBasic = async (investment: InvestmentInterface): Promise<InvestmentBasicDTO> => ({
                id: investment.id,
                type: investment.constructor.name,
                invested: this._getInvestedOrQuantity("price", investment),
                selected: true,
            })
        const getDetails = async (investment: InvestmentInterface): Promise<InvestmentDetailsDTO> => {
            const { unitValue, unitYearlyDividends, name } = await investment.provider.find()
            const quantity = this._getInvestedOrQuantity("quantity", investment)
            return {
                value: unitValue * quantity,
                dividendsPerMonth: unitYearlyDividends * quantity / 12,
                name,
            }
        }

        const mapper = mode === "basic" ? getBasic : getDetails

        return Promise.all((investments as InvestmentInterface[]).map(inv => mapper(inv))) as Promise<InvestmentResultMap[T][]>
    },

    _getInvestedOrQuantity(mode: "price" | "quantity", investment: Investment) {
        return investment.movements
            .map(investment => investment[mode])
            .reduce((previous, current) => previous + current, 0)
    },
}
