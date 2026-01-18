import Investment from "@/entities/Investment"
import InvestmentLine from "./InvestmentLine"
import { formatNumber } from "@/utils"
import InvestmentTag from "./InvestmentTag"
import { InvestmentType } from "@/types/InvestmentType"


export default function Table({ investments, selected, toggleSelected }: { investments: Investment[], selected: boolean, toggleSelected: (ids: number[]) => void }) {
    investments = investments.filter(inv => inv.selected === selected)
    const grouped = Object.values(
        investments.reduce((acc, { type, id }) => {
            if (!acc[type]) acc[type] = { type, values: [] };
            acc[type].values.push(id);
            return acc;
        }, {} as Record<InvestmentType, { type: InvestmentType, values: number[] }>)
    )

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
            {grouped.map(group => <InvestmentTag tag={group.type.toString()} key={group.type.toString()} onClick={() => toggleSelected(group.values)}/>)}
        </div>
    </section>
}