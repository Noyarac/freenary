import Investment from "@/entities/Investment";
import InvestmentTag from "./InvestmentTag";
import { formatNumber } from "@/utils";

export default function InvestmentLine({ investment, toggleSelected }: { investment: Investment, toggleSelected: (ids: number[]) => void }) {

    return (
        <tr>
            <th>{investment.organism} {investment.name}</th>
            <td className="investmentCell"><InvestmentTag tag={investment.type.toString()} /></td>
            <td>{formatNumber(investment.getInvested())}</td>
            <td><input type="checkbox" checked={investment.selected} onChange={() => toggleSelected([investment.id])} /></td>
        </tr>
    )
}