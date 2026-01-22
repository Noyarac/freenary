"use client"

import "reflect-metadata"
import Table from "@/components/Table"
import { useEffect, useState } from "react"
import Investment from "@/entities/Investment"
import InvestmentService from "./services/InvestmentService"

export default function Home() {
    const [investments, setInvestments] = useState<Investment[]>([])
    useEffect(() => {
        fetchInvestments()
    }, [])

    const fetchInvestments = async () => {
        const res = await fetch("/api/investment")
        const rawList = await res.json()
        const investments = rawList.map(InvestmentService.createInvestment)
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
