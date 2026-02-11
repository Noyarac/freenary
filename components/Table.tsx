import InvestmentLine from "@/components/InvestmentLine"
import InvestmentTag from "@/components/InvestmentTag"
import { formatNumber, getHue } from "@/utils"
import InvestmentDTO from "@/types/InvestmentDTO"
import { useInvestmentContext } from "@/contexts/InvestmentContext"
import { useEffect, useState } from "react"
import { PieChart } from "react-minimal-pie-chart"
import InvestmentSubType from "@/types/InvestmentSubType"


export default function Table(
    {
        investments,
        selected,
    }: {
        investments: InvestmentDTO[],
        selected: boolean,
    }
) {
    const { toggleSelected } = useInvestmentContext()
    const [hiddenStates, setHiddenStates] = useState<{ type: string; hidden: boolean }[]>([])
    const types = [...(new Set(investments.map(inv => inv.type)))]
    const groups = types.map(type => ({
        type: type,
        investments: investments
            .filter(inv => inv.type === type)
            .sort((a, b) => b.invested - a.invested)
    }))
    const chartData = groups.map(group => ({
                title: group.type,
                color: getHue(group.type as InvestmentSubType),
                value: group.investments.reduce((prev, cur) => prev + (cur?.value ?? 0), 0)
            }))
    useEffect(() => {
        if (hiddenStates.length === 0) setHiddenStates(types.map(type => ({ type: type, hidden: true })))
    }, [investments.map(inv => inv.id).join()])

    return <section style={{ margin: "1rem" }}>
        <h2>{selected ? "Selected" : "Unselected"}</h2>
        <table style={{ width: "100%", tableLayout: "fixed" }}>
            <colgroup>
                <col span={1} />
                <col span={1} style={{ width: "12ch" }} />
                <col span={1} style={{ width: "12ch" }} />
                <col span={1} style={{ width: "24ch" }} />
                <col span={1} style={{ width: "24ch" }} />
                <col span={1} style={{ width: "12ch" }} />
            </colgroup>
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col" style={{ whiteSpace: "nowrap" }}>Invested</th>
                    <th scope="col" style={{ whiteSpace: "nowrap" }}>Value</th>
                    <th scope="col" style={{ whiteSpace: "nowrap" }}>Dividends per month</th>
                    <th scope="col" style={{ whiteSpace: "nowrap" }}>Capital gain per month</th>
                    <th scope="col" style={{ whiteSpace: "nowrap" }}>Selection</th>
                </tr>
            </thead>
            {groups.map(group => (
                <tbody key={group.type}>
                    <tr
                        onClick={() => setHiddenStates(prev =>
                            prev.map(state =>
                                state.type === group.type
                                    ? { ...state, hidden: !state.hidden }
                                    : state
                            )
                        )}
                    >
                        <th scope="rowgroup">{group.type}</th>
                        <td>{formatNumber(group.investments.reduce((prev, cur) => prev += cur.invested, 0))} €</td>
                        <td>{formatNumber(group.investments.reduce((prev, cur) => prev += cur.value ?? 0, 0))} €</td>
                        <td>{formatNumber(group.investments.reduce((prev, cur) => prev += cur.dividendsPerMonth ?? 0, 0))} €</td>
                        <td>{formatNumber(group.investments.reduce((prev, cur) => prev += cur.latentCapitalGain ?? 0, 0))} €</td>
                        <td></td>
                    </tr>
                    {group.investments.map(investement => (
                        <InvestmentLine
                            key={investement.id}
                            investment={investement}
                            hidden={hiddenStates.find(state => state.type === group.type)?.hidden ?? false}
                        />
                    ))}
                </tbody>
            ))}
            <tfoot>
                <tr>
                    <th scope="row">Total</th>
                    <td>{formatNumber(investments.reduce((prev, cur) => prev += cur.invested, 0))} €</td>
                    <td>{formatNumber(investments.reduce((prev, cur) => prev += cur.value ?? 0, 0))} €</td>
                    <td>{formatNumber(investments.reduce((prev, cur) => prev += cur.dividendsPerMonth ?? 0, 0))} €</td>
                    <td>{formatNumber(investments.reduce((prev, cur) => prev += cur.latentCapitalGain ?? 0, 0))} €</td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
        <PieChart
            style={{ height: "18rem", margin: "2rem" }}
            data={chartData}
            animate={true}
            radius={45}
            label={({dataEntry}) => dataEntry.title}
            labelStyle={{ fill: "white", fontSize: 7 }}
            labelPosition={70}
            segmentsShift={5}
        />
        <div>
            <div>{selected ? "Remove" : "Add"}</div>
            {groups.map(group => <InvestmentTag key={group.type} tag={group.type} onClick={() => toggleSelected(group.investments.map(inv => inv.id))} />)}
        </div>
    </section>
}