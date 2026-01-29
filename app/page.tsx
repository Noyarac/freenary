"use client"

import Table from "@/components/Table"
import { useInvestmentContext } from "@/contexts/InvestmentContext"

export default function Home() {
    const { investments } = useInvestmentContext()
    return (<>
        <Table investments={ investments.filter(inv => inv.selected) } selected={true} />
        <Table investments={ investments.filter(inv => !inv.selected) } selected={false} />
    </>)
}
