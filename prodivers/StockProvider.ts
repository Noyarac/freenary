import Stock from "@/entities/Stock"
import InvestmentProvider from "@/types/InvestmentProvider"

const StockProviderWrapper = (stock: Stock) => {
    return {
        async find() {
            const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${stock.id}?interval=1wk&range=1y&formatted=false&includeAdjustedClose=false&userYfid=false`)
            const rawData = await response.json()
            const data = rawData.chart.result[0]
            const name = data.meta.shortName
            const unitValue = data.meta.regularMarketPrice
            const closeValues = (data.indicators.quote[0].close.filter( (val: any) => val !== undefined && val !== null)) as number[]
            const unitLatentCapitalGain = ((closeValues.at(-1) ?? 0) / (closeValues[0])) - 1
            return { name, unitValue, unitYearlyDividends: 0, unitLatentCapitalGain}
        }
    } as InvestmentProvider
}
export default StockProviderWrapper


