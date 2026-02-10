import InvestmentTag from "@/components/InvestmentTag"
import { formatNumber } from "@/utils"
import InvestmentDTO from "@/types/InvestmentDTO"
import Spinner from "@/components/Spinner"
import { useInvestmentContext } from "@/contexts/InvestmentContext"
import Link from "next/link"

export default function InvestmentLine({ investment, hidden = false }: { investment: InvestmentDTO, hidden?: boolean }) {
    const { toggleSelected } = useInvestmentContext()
    return (
        <tr hidden={hidden}>
            <th>{ investment.name ? <Link href={`/details/?id=${investment.id}`} >{investment.name}</Link> : <Spinner /> }</th>
            <td>{formatNumber(investment.invested)} €</td>
            <td>{investment.value !== undefined ? (formatNumber(investment.value) + " €") : <Spinner />}</td>
            <td>{investment.dividendsPerMonth !== undefined ? (formatNumber(investment.dividendsPerMonth) + " €") : <Spinner />}</td>
            <td>{investment.latentCapitalGain !== undefined ? (formatNumber(investment.latentCapitalGain) + " €") : <Spinner />}</td>
            <td><button className="secondary" onClick={() => toggleSelected([investment.id])} >Move</button></td>
        </tr>
    )
}