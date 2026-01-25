import InvestmentService, { InvestmentServiceObject } from "@/services/InvestmentService"
import Stock from "@/entities/Stock"

export interface StockServiceObject extends InvestmentServiceObject {
}

function StockService(stock: Stock) {
    const basicMethodes = InvestmentService(stock)
    const extraMethods = {
        async _getUnitValue(): Promise<number> {
            const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${stock.ticker}`)
            const rawData = await response.json()
            const data = rawData.chart.result[0].meta
            return Number.parseFloat(data.regularMarketPrice)
        },
    }
    const allMethodes = Object.assign(basicMethodes, extraMethods)
    return allMethodes as StockServiceObject
}
export default StockService