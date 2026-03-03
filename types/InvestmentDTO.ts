interface InvestmentDTO {
    id: string
    type: string
    invested: number
    selected?: boolean
    name?: string,
    value?: number,
    dividendsPerMonth?: number,
    latentCapitalGain?: number,
    performance?: number,
}
export default InvestmentDTO