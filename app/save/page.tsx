"use client"

import { useInvestmentContext } from "@/contexts/InvestmentContext";
import { useToastContext } from "@/contexts/ToastContext";
import InvestmentSubType from "@/types/InvestmentSubType";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

export default function SavePage() {
    return <Suspense fallback="Loading"><SaveContent /></Suspense>
}

function SaveContent() {
    const params = useSearchParams()
    const id = params.get("id")
    const { investments, removeInvestment, addInvestment } = useInvestmentContext()
    const investment = investments.find(inv => inv.id === id)
    const { setToast } = useToastContext()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const data = new FormData(form)
        try {
            const res = await fetch("/api/investment", {
                method: "POST",
                body: data
            })
            const json = await res.json()
            if (res.ok) {
                setToast({ message: "Investment saved!", level: "success"})
                addInvestment(data.get("id")?.toString()!)
            } else if (json.name === "ZodError") {
                const details = JSON.parse(json.message)
                setToast({ message: `Error: ${details[0].message}`, level: "error"})
            }
        } catch (err) {
            setToast({ message: "Something went wrong.", level: "error"})
            console.debug(err)
        }
    }

    const handleDelete = async () => {
        if (!confirm("Are you sure? This can't be undone.")) return;
        try {
            const res = await fetch("/api/investment", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ids: investment?.id })
            })
            const json = await res.json()
            if (res.ok) {
                setToast({ message: "Investment deleted!", level: "success"})
                removeInvestment(investment!.id)
            } else if (json.name === "ZodError") {
                const details = JSON.parse(json.message)
                setToast({ message: `Error: ${details[0].message}`, level: "error"})
            }
        } catch (err) {
            setToast({ message: "Something went wrong.", level: "error"})
            console.debug(err)
        }
    }


    return <>
        <h2>{investment === undefined ? "Add a new investment" : "Update an investment"}</h2>
        <form onSubmit={handleSubmit} id="save">
            <label htmlFor="type">Type</label>
            <select id="type" name="type" required>
                {Object.values(InvestmentSubType).map(subtype => <option key={subtype} value={subtype} selected={investment?.type == subtype}>{subtype}</option>)}
            </select>
        <label htmlFor="id">Id</label>
        <input type="text" id="id" name="id" value={investment?.id} required={investment === undefined} disabled={investment !== undefined} />
        </form>
        <div>
            <button form="save">Submit</button>
            <button className="danger" onClick={handleDelete}>Delete</button>
        </div>
        
    </>
}