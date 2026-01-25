import InvestmentTag from "@/components/InvestmentTag"
import { formatNumber } from "@/utils"
import { InvestmentDTO } from "@/types/InvestmentDTO"

export default function InvestmentLine({ investment, toggleSelected }: { investment: InvestmentDTO, toggleSelected: (ids: number[]) => void }) {

    return (
        <tr>
            <th>{investment.name}</th>
            <td className="investmentCell"><InvestmentTag tag={investment.type} /></td>
            <td>{formatNumber(investment.invested)} €</td>
            <td>{formatNumber(investment.value)} €</td>
            <td>{formatNumber(investment.dividendsPerMonth)} €</td>
            <td><input type="checkbox" checked={investment.selected} onChange={() => toggleSelected([investment.id])} /></td>
        </tr>
    )
}