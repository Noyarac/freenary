export default interface InvestmentProvider {
    find(): Promise<{
        unitValue: number,
        unitYearlyDividends: number,
        name: string,
        unitLatentCapitalGain: number,
    }>
}
