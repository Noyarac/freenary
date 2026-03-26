import MovementDTO from "./MovementDTO"

interface InvestmentDTO {
    id: string
    type: string
    invested: number
    movements: MovementDTO[]
    selected?: boolean
    name?: string
    value?: number
    dividendsPerMonth?: number
    latentCapitalGain?: number
    performance?: number
}
export default InvestmentDTO