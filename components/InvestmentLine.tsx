import InvestmentTag from "@/components/InvestmentTag"
import { formatNumber } from "@/utils"
import InvestmentDTO from "@/types/InvestmentDTO"
import Spinner from "@/components/Spinner"
import { useInvestmentContext } from "@/contexts/InvestmentContext"

export default function InvestmentLine({ investment, hidden = false }: { investment: InvestmentDTO, hidden?: boolean }) {
    const { toggleSelected } = useInvestmentContext()
    return (
        <tr hidden={hidden}>
            <th>{investment.name ?? <Spinner /> }</th>
            <td>{formatNumber(investment.invested)} €</td>
            <td>{investment.value !== undefined ? (formatNumber(investment.value) + " €") : <Spinner />}</td>
            <td>{investment.dividendsPerMonth !== undefined ? (formatNumber(investment.dividendsPerMonth) + " €") : <Spinner />}</td>
            <td>{investment.latentCapitalGain !== undefined ? (formatNumber(investment.latentCapitalGain) + " €") : <Spinner />}</td>
            <td><input type="checkbox" checked={investment.selected} onChange={() => toggleSelected([investment.id])} /></td>
        </tr>
    )
}