"use client"

import Spinner from "@/components/Spinner";
import { useInvestmentContext } from "@/contexts/InvestmentContext";
import { formatNumber } from "@/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default  function DetailsPage() {
    const params = useSearchParams()
    const id = params.get("id")
    const { investments } = useInvestmentContext()
    const investment = investments.find(inv => inv.id === id)
    return investment === undefined ? "Loading" : <>
    <h2>{investment.name ?? <Spinner />}</h2>
    <Link href={`/save?id=${investment.id}`}>Edit</Link>
    <dl>
        <dt>Invested</dt>
        <dd>{formatNumber(investment.invested) + " €"}</dd>
        <dt>Current value</dt>
        <dd>{investment.value !== undefined ? (formatNumber(investment.value) + " €") : <Spinner />}</dd>
        <dt>Latent capital gain</dt>
        <dd>{formatNumber(investment.latentCapitalGain ?? 0) + " €"}</dd>
        <dt>Dividends per month</dt>
        <dd>{investment.dividendsPerMonth !== undefined ? (formatNumber(investment.dividendsPerMonth) + " €") : <Spinner />}</dd>
    </dl>
    </>
}