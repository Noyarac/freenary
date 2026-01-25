import { JSDOM } from "jsdom"
import Scpi from "@/entities/Scpi"
import InvestmentService, { InvestmentServiceObject } from "@/services/InvestmentService"

export interface ScpiServiceObject extends InvestmentServiceObject {
    _findDetails(): Promise<{ year: number, subscription: number, withdraw: number, dividendeCourant: number, dividendePV: number }[]>
    _extractFromNodes({ dom, label }: { dom: JSDOM, label: "years" | string }): number[]
}

function ScpiService(scpi: Scpi) {
    const basicMethodes = InvestmentService(scpi)
    const extraMethods = {
        getName(): string {
            return `${scpi.organism} ${scpi.name}`
        },

        async _getUnitValue(): Promise<number> {
            const details = await this._findDetails()
            const currentUnitValue = details
                .reduce((previous, current) => current?.year > previous.year ? current : previous, { year: 1901, withdraw: 0 })
                .withdraw
            return currentUnitValue
        },

        async _findDetails() {
            const valueDom = await JSDOM.fromURL(`https://www.scpi-lab.com/scpi.php?vue=valorisation&produit_id=${scpi.scpiLabId}`)
            const years = this._extractFromNodes({ dom: valueDom, label: "years" })
            const subscriptions = this._extractFromNodes({ dom: valueDom, label: "Prix de souscription" })
            const withdraws = this._extractFromNodes({ dom: valueDom, label: "Valeur de retrait" })
    
            const distributionDom = await JSDOM.fromURL(`https://www.scpi-lab.com/scpi.php?vue=distribution&produit_id=${scpi.scpiLabId}`)
            const distributionYears = this._extractFromNodes({ dom: distributionDom, label: "years" })
            const dividendeCourant = this._extractFromNodes({ dom: distributionDom, label: "Dividende courant" })
            const dividendePV = this._extractFromNodes({ dom: distributionDom, label: "Dividende de PV" })
    
            return (new Array(years.length)).fill(null).map((_, index) => {
                const answer = {
                    year: years.at(index),
                    subscription: subscriptions.at(index),
                    withdraw: withdraws.at(index),
                    dividendeCourant: dividendeCourant.at(distributionYears.indexOf(years.at(index) ?? 0)),
                    dividendePV: dividendePV.at(distributionYears.indexOf(years.at(index) ?? 0)),
                }
                if (Array.from(Object.values(answer)).some(value => value === undefined)) throw new Error()
                return answer as { [K in keyof typeof answer]: Exclude<typeof answer[K], undefined> }
            })
        },
    
        _extractFromNodes({ dom, label }: { dom: JSDOM, label: "years" | string }) {
            const rows = dom.window.document
                .querySelector("#table_scpi_bloc_cr_part")
                ?.querySelectorAll("tbody")
                ?.item(label === "years" ? 0 : 1)
                ?.querySelectorAll("tr")
            if (!rows) throw new Error()
            const tr = label === "years" ? rows.item(0) : Array.from(rows).find(tr => {
                return tr.querySelector("td")?.textContent.trim() === label
            })
            if (!tr || tr.children.length < 2) throw new Error()
            const values = Array.from(tr.children).slice(1).slice(0, tr.children.length - 2)
            return values.map(c => Number.parseFloat(c.textContent.replaceAll("€", "").replaceAll(",", ".")))
        }
    }
    const allMethodes = Object.assign(basicMethodes, extraMethods)
    return allMethodes as ScpiServiceObject
}
export default ScpiService