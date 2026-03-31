"use client"

import Spinner from "@/components/Spinner";
import { useInvestmentContext } from "@/contexts/InvestmentContext";
import { useToastContext } from "@/contexts/ToastContext";
import MovementDTO from "@/types/MovementDTO";
import { formatNumber } from "@/utils";
import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function DetailsPage() {
    return <Suspense fallback="Loading"><DetailsContent /></Suspense>
}

function DetailsContent() {
    const params = useSearchParams()
    const id = params.get("id")
    const { investments, removeMovement, addMovement } = useInvestmentContext()
    const investment = investments.find(inv => inv.id === id)
    const { setToast } = useToastContext()

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure? This can't be undone.")) return;
        try {
            const res = await fetch("/api/movement", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            })
            const json = await res.json()
            if (res.ok) {
                setToast({ message: "Movement deleted!", level: "success" })
                removeMovement(investment!.id, id)
            } else if (json.name === "ZodError") {
                const details = JSON.parse(json.message)
                setToast({ message: `Error: ${details[0].message}`, level: "error" })
            }
        } catch (err) {
            setToast({ message: "Something went wrong.", level: "error" })
            console.debug(err)
        }
    }

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const data = new FormData(form)
        data.set("investmentId", investment!.id)
        try {
            const res = await fetch("/api/movement", {
                method: "POST",
                body: data
            })
            const movement = await res.json() as MovementDTO
            movement.date = new Date(movement.date)
            if (res.ok) {
                setToast({ message: "Movement saved!", level: "success" })
                addMovement(movement)
                form.reset()
            } else if ((movement as any).name === "ZodError") {
                const details = JSON.parse((movement as any).message)
                setToast({ message: `Error: ${details[0].message}`, level: "error" })
            }
        } catch (err) {
            setToast({ message: "Something went wrong.", level: "error" })
            console.debug(err)
        }
    }

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
            {investment.type === "Stock" ? <>
                <dt>Expected performance</dt>
                <dd>{investment.expectedPerformance !== undefined ? (formatNumber(investment.expectedPerformance * 100) + " %") : <Spinner />}</dd> </> : ""
            }
            <dt>Performance</dt>
            <dd>{investment.performance !== undefined ? (formatNumber(investment.performance * 100) + " %") : <Spinner />}</dd>
        </dl>
        <form onSubmit={handleCreate} id="createMovement"></form>
        <table>
            <thead>
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Quantiy</th>
                    <th scope="col">Price</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="date" name="date" form="createMovement" /></td>
                    <td><input type="number" name="quantity" form="createMovement" /></td>
                    <td><input type="number" name="price" form="createMovement" /></td>
                    <td><button className="create" form="createMovement" ></button></td>
                </tr>

                {investment.movements.map(movement =>
                    <tr key={movement.id}>
                        <td>{`${movement.date.getDate()} / ${movement.date.getMonth()} / ${movement.date.getFullYear() % 100}`}</td>
                        <td>{movement.quantity}</td>
                        <td>{formatNumber(movement.price) + " €"}</td>
                        <td><button className="delete" onClick={() => handleDelete(movement.id)}></button></td>
                    </tr>
                )}
            </tbody>
        </table>
    </>
}