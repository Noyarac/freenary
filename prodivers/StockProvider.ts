import Stock from "@/entities/Stock"
import InvestmentProvider from "@/types/InvestmentProvider"

const StockProviderWrapper = (stock: Stock) => {
    return {
        async find() {
            const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${stock.id}`)
            const rawData = await response.json()
            const data = rawData.chart.result[0].meta
            const name = data.shortName
            const unitValue = data.regularMarketPrice
            return { name, unitValue, unitYearlyDividends: 0}
        }
    } as InvestmentProvider
}
export default StockProviderWrapper


