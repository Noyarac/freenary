import Investment from "@/entities/Investment"
import InvestmentLine from "./InvestmentLine"
import { formatNumber } from "@/utils"
import InvestmentTag from "./InvestmentTag"
import InvestmentService from "@/app/services/InvestmentService"


export default function Table({ investments, selected, toggleSelected }: { investments: Investment[], selected: boolean, toggleSelected: (ids: number[]) => void }) {
    investments = investments.filter(inv => inv.selected === selected)
    const types = [...(new Set(investments.map(inv => inv.constructor.name)))]
    const groups = types.map(type => {
        return {
            type: type,
            values: investments
            .filter(inv => inv instanceof InvestmentService.getClassByName(type))
            .map(inv => inv.id)
        }
    })

    return <section style={{ margin: "1rem" }}>
        <h2>{selected ? "Selected" : "Unselected"}</h2>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Invested</th>
                    <th>Selected</th>
                </tr>
            </thead>
            <tbody>
                {investments.map(investement => <InvestmentLine key={investement.name} investment={investement} toggleSelected={toggleSelected} />)}
            </tbody>
            <tfoot>
                <tr>
                    <th>Total</th>
                    <td></td>
                    <td>{formatNumber(investments.reduce((prev, cur) => prev += cur.getInvested(), 0))}</td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
        <div style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
            <div>{selected ? "Remove" : "Add"}</div>
            {groups.map(group => <InvestmentTag key={group.type} tag={group.type} onClick={() => toggleSelected(group.values)} />)}
        </div>
    </section>
}