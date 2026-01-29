import InvestmentLine from "@/components/InvestmentLine"
import InvestmentTag from "@/components/InvestmentTag"
import { formatNumber } from "@/utils"
import InvestmentDTO from "@/types/InvestmentDTO"


export default function Table(
    {
        investments,
        selected,
        toggleSelected
    }: {
        investments: InvestmentDTO[],
        selected: boolean,
        toggleSelected: (ids: string[]) => void
    }
) {
    investments = investments
        .filter(inv => inv.selected === selected)
        .sort((a, b) => b.invested - a.invested)
        .sort((a, b) => a.type < b.type ? 1 : 0)
    const types = [...(new Set(investments.map(inv => inv.type)))]
    const groups = types.map(type => {
        return {
            type: type,
            ids: investments
                .filter(inv => inv.type === type)
                .map(inv => inv.id)
        }
    })


    return <section style={{ margin: "1rem" }}>
        <h2>{selected ? "Selected" : "Unselected"}</h2>
        <table style={{width: "100%", tableLayout: "fixed"}}>
            <colgroup>
                <col span={1} />
                <col span={1} style={{width: "12ch"}}/>
                <col span={1} style={{width: "12ch"}}/>
                <col span={1} style={{width: "12ch"}}/>
                <col span={1} style={{width: "24ch"}}/>
                <col span={1} style={{width: "12ch"}}/>
            </colgroup>
            <thead>
                <tr>
                    <th>Name</th>
                    <th style={{whiteSpace: "nowrap"}}>Type</th>
                    <th style={{whiteSpace: "nowrap"}}>Invested</th>
                    <th style={{whiteSpace: "nowrap"}}>Value</th>
                    <th style={{whiteSpace: "nowrap"}}>Dividends per month</th>
                    <th style={{whiteSpace: "nowrap"}}>Selected</th>
                </tr>
            </thead>
            <tbody>
                {investments.map(investement => <InvestmentLine key={investement.id} investment={investement} toggleSelected={toggleSelected} />)}
            </tbody>
            <tfoot>
                <tr>
                    <th>Total</th>
                    <td></td>
                    <td>{formatNumber(investments.reduce((prev, cur) => prev += cur.invested, 0))} €</td>
                    <td>To be fixed</td>
                    <td>To be fixed</td>
                    {/* <td>{formatNumber(investments.reduce((prev, cur) => prev += cur.value, 0))} €</td>
                    <td>{formatNumber(investments.reduce((prev, cur) => prev += cur.dividendsPerMonth, 0))} €</td> */}
                    <td></td>
                </tr>
            </tfoot>
        </table>
        <div style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
            <div>{selected ? "Remove" : "Add"}</div>
            {groups.map(group => <InvestmentTag key={group.type} tag={group.type} onClick={() => toggleSelected(group.ids)} />)}
        </div>
    </section>
}