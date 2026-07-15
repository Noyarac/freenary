import MovementDTO from "./MovementDTO"
import SplitDTO from "./SplitDTO"

interface InvestmentDTO {
    id: string
    type: string
    invested: number
    movements: MovementDTO[]
    splits: SplitDTO[]
    selected?: boolean
    name?: string
    value?: number
    enableDividend?: boolean
    dividendsPerMonth?: number
    latentCapitalGain?: number
    performance?: number
    expectedPerformance?: number
}
export default InvestmentDTO