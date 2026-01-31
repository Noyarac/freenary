export default interface InvestmentProvider {
    // _cache?: { date: string , tla_tldds_percent: number }[],
    find(): Promise<{
        unitValue: number,
        unitYearlyDividends: number,
        name: string,
        unitLatentCapitalGain: number,
    }>
}
