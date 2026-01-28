"use client"

import { useEffect, useState } from "react"
import { InvestmentDTO } from "@/types/InvestmentDTO"
import Table from "@/components/Table"

export default function Home() {
    const [investments, setInvestments] = useState<InvestmentDTO[]>([])
    useEffect(() => {
        fetchInvestments()
    }, [])

    const fetchInvestments = async () => {
        const res = await fetch("/api/investment/all")
        const investments: InvestmentDTO[] = await res.json()
        setInvestments(investments)
    }

    const toggleSelected = (ids: number[]) => {
        setInvestments(investments.map(inv => {
            inv.selected = ids.includes(inv.id) ? !inv.selected : inv.selected; return inv
        }))
    }
    return (<>
        <Table investments={investments} selected={true} toggleSelected={toggleSelected} />
        <Table investments={investments} selected={false} toggleSelected={toggleSelected} />
    </>)
}
