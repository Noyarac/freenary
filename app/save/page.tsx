"use client"

import { useInvestmentContext } from "@/contexts/InvestmentContext";
import { useToastContext } from "@/contexts/ToastContext";
import InvestmentSubType from "@/types/InvestmentSubType";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function SavePage() {
    const params = useSearchParams()
    const id = params.get("id")
    const { investments } = useInvestmentContext()
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
        <form onSubmit={handleSubmit}>
            <label htmlFor="type">Type</label>
            <select id="type" name="type" required>
                {Object.values(InvestmentSubType).map(subtype => <option key={subtype} value={subtype}>{subtype}</option>)}
            </select>
        <label htmlFor="id">Id</label>
        <input type="text" id="id" name="id" required />
        <div><button>Submit</button></div>
        </form>
    </>
}