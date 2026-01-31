import Livret from "@/entities/Livret"
import InvestmentProvider from "@/types/InvestmentProvider"

type DataType = { date: string , tla_tldds_percent: number }[]

let _cache: DataType

const LivretProviderWrapper = (livret: Livret) => { return {
    async _getData() {
        if (_cache === undefined) {
            const res = await fetch(`https://opendata.caissedesdepots.fr/api/explore/v2.1/catalog/datasets/flux-et-taux-la-ldds-lep/exports/json`)
            _cache = await res.json()
        }
        return _cache
    },
    async find() {
        const answer = { unitValue: 1, unitYearlyDividends: 0, name: livret.id, unitLatentCapitalGain: 0}
        const data = await (this as any)._getData() as DataType
        const last = data.reduce((prev, cur) => new Date(cur.date) > new Date(prev.date) ? cur : prev, { date: "1900-01", tla_tldds_percent: 0 })
        answer.unitLatentCapitalGain = last.tla_tldds_percent / 100
        return answer
    }
} as InvestmentProvider}
export default LivretProviderWrapper


