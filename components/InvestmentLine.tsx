import InvestmentTag from "@/components/InvestmentTag"
import { formatNumber } from "@/utils"
import InvestmentDTO from "@/types/InvestmentDTO"
import Spinner from "@/components/Spinner"
import { useInvestmentContext } from "@/contexts/InvestmentContext"

export default function InvestmentLine({ investment }: { investment: InvestmentDTO }) {
    const { toggleSelected } = useInvestmentContext()
    return (
        <tr>
            <th>{investment.name ?? <Spinner /> }</th>
            <td className="investmentCell"><InvestmentTag tag={investment.type} /></td>
            <td>{formatNumber(investment.invested)} €</td>
            <td>{investment.value !== undefined ? (formatNumber(investment.value) + " €") : <Spinner />}</td>
            <td>{investment.dividendsPerMonth !== undefined ? (formatNumber(investment.dividendsPerMonth) + " €") : <Spinner />}</td>
            <td><input type="checkbox" checked={investment.selected} onChange={() => toggleSelected([investment.id])} /></td>
        </tr>
    )
}