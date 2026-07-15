import Stock from "@/entities/Stock"
import InvestmentProvider from "@/types/InvestmentProvider"
import Constants from "@/configurations/constants"

const StockProviderWrapper = (stock: Stock) => {
    return {
        async find() {
            const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${stock.id}?interval=1wk&range=15y&formatted=false&includeAdjustedClose=false&userYfid=false`)
            const rawData = await response.json()
            const data = rawData.chart.result[0]
            const name = data.meta.shortName
            const unitValue = data.meta.regularMarketPrice
            let closeValues = data.indicators.quote[0].close as number[]
            const timestamps = data.timestamp.map((ts: number) => new Date(ts * 1000))
            if (closeValues.length !== timestamps.length) throw new Error(`When scraping ${stock.id}, timestamps length didn't match closeValues length.`)
            
            closeValues = closeValues.map((val, index) => val / stock.splits.reduce((prev, cur) => (new Date(timestamps[index]).getTime() > cur.date.getTime() - Constants.MILLISECONDS_IN_DAY * 4 ? prev : {ratio: prev.ratio * cur.ratio}), { ratio: 1 }).ratio)
            const todayStock = (closeValues.at(-1) ?? 0)
            const averagedOneYearAgoStock = closeValues.slice(Math.max(0, closeValues.length - 1 - Constants.WEEKS_IN_YEAR * 2)).reduce((prev, cur) => prev + cur, 0) / (Math.min(closeValues.length, Constants.WEEKS_IN_YEAR * 2))
            const unitLatentCapitalGain = todayStock - averagedOneYearAgoStock
            const firstThird = closeValues.slice(0, closeValues.length / 3)
            const lastThird = closeValues.slice(closeValues.length * 2 / 3)
            const averagedFirstThirdStockValue = firstThird.reduce((prev, cur) => prev + cur, 0) / (firstThird.length)
            const averagedLastThirdStockValue = lastThird.reduce((prev, cur) => prev + cur, 0) / (lastThird.length)
            const expectedPerformance = (averagedLastThirdStockValue / averagedFirstThirdStockValue) ** (1 / (closeValues.length * 2 / 3 / Constants.WEEKS_IN_YEAR)) - 1
            return { name, unitValue, unitYearlyDividends: 0, unitLatentCapitalGain, expectedPerformance}
        }
    } as InvestmentProvider
}
export default StockProviderWrapper


