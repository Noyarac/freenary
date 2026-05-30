import MovementDTO from "./MovementDTO"

interface InvestmentDTO {
    id: string
    type: string
    invested: number
    movements: MovementDTO[]
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