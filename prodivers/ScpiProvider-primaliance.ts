import type Scpi from "@/entities/Scpi"
import InvestmentProvider from "@/types/InvestmentProvider"
import { JSDOM } from "jsdom"

const ScpiProviderWrapper = (scpi: Scpi) => { return {
    async find() {
        const answer = { unitValue: 0, unitYearlyDividends: 0, name: "", unitLatentCapitalGain: 0}
        const dom = await JSDOM.fromURL(`https://www.primaliance.com/scpi-de-rendement/${scpi.id}`)
        if (scpi.enableDividend) {
            const unitYearlyDividends = dom.window.document.querySelector(".dividende_net .prg-key-nb .major-nb")?.textContent.replace(',', '.')
            if (!unitYearlyDividends) throw new Error("Can't parse unitYearlyDividend.")
            answer["unitYearlyDividends"] = Number.parseFloat(unitYearlyDividends)
        } else {
            answer["unitYearlyDividends"] = 0
        }

        const unitValue = dom.window.document.querySelector(".valeur_reconstitution .prg-key-nb .major-nb")?.textContent.replace(',', '.')
        if (!unitValue) throw new Error("Can't parse unitValue.")
        answer["unitValue"] = Number.parseFloat(unitValue)

        const name = dom.window.document.querySelector("h1")?.textContent.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ")
        if (!name) throw new Error("Can't parse name.")
        answer["name"] = name
        answer.name = name
        return answer
    }
} as InvestmentProvider}
export default ScpiProviderWrapper


