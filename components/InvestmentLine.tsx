import InvestmentTag from "@/components/InvestmentTag"
import { formatNumber } from "@/utils"
import InvestmentDTO from "@/types/InvestmentDTO"
import { useEffect, useState } from "react"
import Spinner from "@/components/Spinner"

interface InvestmentDetails {
    name: string,
    value: number,
    dividendsPerMonth: number
}

export default function InvestmentLine({ investment, toggleSelected }: { investment: InvestmentDTO, toggleSelected: (ids: string[]) => void }) {
    const [investmentDetails, setInvestmentDetails] = useState<InvestmentDetails>({ name: "", value: 0, dividendsPerMonth: 0})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchDetails()
    }, [investment])

    const fetchDetails = async () => {
        setLoading(true)
        const res = await fetch(`/api/investment/?mode=details&id=${investment.id}`)
        const investmentDetails: InvestmentDetails = (await res.json()).pop()
        setInvestmentDetails(investmentDetails)
        setLoading(false)
    }


    return (
        <tr>
            <th>{loading ? <Spinner /> : investmentDetails.name}</th>
            <td className="investmentCell"><InvestmentTag tag={investment.type} /></td>
            <td>{formatNumber(investment.invested)} €</td>
            <td>{loading ? <Spinner /> : formatNumber(investmentDetails.value) + " €"}</td>
            <td>{loading ? <Spinner /> : formatNumber(investmentDetails.dividendsPerMonth) + " €"}</td>
            <td><input type="checkbox" checked={investment.selected} onChange={() => toggleSelected([investment.id])} /></td>
        </tr>
    )
}