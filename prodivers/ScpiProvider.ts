import Scpi from "@/entities/Scpi"
import InvestmentProvider from "@/types/InvestmentProvider"
import { JSDOM } from "jsdom"

const ScpiProviderWrapper = (scpi: Scpi) => { return {
    async find() {
        const answer = { unitValue: 0, unitYearlyDividends: 0, name: "", unitLatentCapitalGain: 0}
        const dom = await JSDOM.fromURL(`https://www.scpi-lab.com/scpi.php?vue=synthese&produit_id=${scpi.id}`)
        const infoBoxes = dom.window.document.querySelectorAll(".info-box-4 .content")
        const scrapData: {propertyName: keyof Omit<typeof answer, "name">, label: string}[] = [
            { propertyName: "unitValue", label: "Retrait au"} ,
            { propertyName: "unitYearlyDividends", label: "Distribution nette"} ,
        ]
        for (const { propertyName, label } of scrapData) {
            const nodesArray = Array.from(infoBoxes)
                    .find(box => box.querySelector(".text")?.textContent.includes(label))
                    ?.querySelector(".number")
                    ?.childNodes
                ?? []
            const text = Array.from(nodesArray)
                .filter(node => node.textContent?.includes("€"))
                .map(node => node.textContent?.trim())
                .filter(Boolean)
                .pop()
            if (!text) throw new Error()
            const number = Number.parseFloat(text.replaceAll(" €", "").replaceAll(",", "."))
            answer[propertyName] = number
        }
        const name = Array.from(dom.window.document.querySelectorAll("h1"))
            .find(h1 => h1.classList.length === 0)
            ?.textContent
            ?.trim()
            ?.replace("SCPI ", "")
        if (name === undefined) throw new Error()
        answer.name = name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ")
        return answer
    }
} as InvestmentProvider}
export default ScpiProviderWrapper


