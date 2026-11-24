import Stock from "@/entities/Stock"
import InvestmentProvider from "@/types/InvestmentProvider"
import constants from "@/configurations/constants"

const StockProviderWrapper = (stock: Stock) => {
    return {
        async find() {
            const period1 = new Date(constants.START_DATE).valueOf() / 1000 - constants.SECONDS_IN_WEEK
            const period2 = new Date(constants.START_DATE).valueOf() / 1000 + constants.SECONDS_IN_WEEK
            const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${stock.id}?interval=1d&period1=${period1}&period2=${period2}&formatted=false&includeAdjustedClose=false&userYfid=false`)
            const rawData = await response.json()
            const data = rawData.chart.result[0]
            const name = data.meta.shortName
            const unitValue = data.meta.regularMarketPrice
            const closeValues = data.indicators.quote[0].close as number[]
            const dates = data.timestamp.map((ts: number) => new Date(ts * 1000))
            if (closeValues.length !== dates.length) throw new Error(`When scraping ${stock.id}, timestamps length didn't match closeValues length.`)
            
            const index = dates.findIndex((date: Date) => date >= new Date(constants.START_DATE))
            const refValue = closeValues.at(index)
            const unitLatentCapitalGain = unitValue - refValue!
            const expectedPerformance = 0.08
            return { name, unitValue, unitYearlyDividends: 0, unitLatentCapitalGain, expectedPerformance}
        }
    } as InvestmentProvider
}
export default StockProviderWrapper


