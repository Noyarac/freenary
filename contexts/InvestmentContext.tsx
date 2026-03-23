"use client"

import InvestmentDTO from "@/types/InvestmentDTO"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"

type InvestmentContextType = {
  investments: InvestmentDTO[]
  toggleSelected: (ids: string[]) => void
  removeInvestment: (id: string) => void
  addInvestment: (id: string) => void
}
const InvestmentContext = createContext<InvestmentContextType | undefined>(undefined)

export function InvestmentContextProvider({ children }: { children: ReactNode }) {
  const [investments, setInvestments] = useState<InvestmentDTO[]>([])

  useEffect(() => {
    const updateInvestmentBasic = async () => {
      const responseBasicAll = await fetch("/api/investment/")
      const investmentsBasicAll = ((await responseBasicAll.json()) as InvestmentDTO[])
        .map(inv => ({ ...inv, selected: true }))
      setInvestments(investmentsBasicAll)
      return investmentsBasicAll
    }

    const updateInvestmentDetailed = async (investment: InvestmentDTO) => {
      const invRes = await fetch(`/api/investment/?detailed=true&ids=${investment.id}`)
      const invJson = (await invRes.json()).pop()
      setInvestments(prev =>
        prev.map(inv => (inv.id === invJson.id ? { ...inv, ...invJson } : inv))
      )
    }

    updateInvestmentBasic().then(basic => {
      basic.map(updateInvestmentDetailed)
    })
  }, [])

  const toggleSelected = (ids: string[]) => {
    setInvestments(prev =>
      prev.map(inv => ({
        ...inv,
        selected: ids.includes(inv.id) ? !inv.selected : inv.selected,
      }))
    )
  }

  const removeInvestment = (id: string) => {
    setInvestments(prev =>
      prev.filter(inv => inv.id !== id)
    )
  }

  const addInvestment = async (id: string) => {
    const invRes = await fetch(`/api/investment/?detailed=true&ids=${id}`)
    const invJson = (await invRes.json()).pop()
    invJson.selected = true
    setInvestments(prev =>
      [...prev, invJson]
    )
  }

  return (
    <InvestmentContext.Provider value={{ investments, toggleSelected, removeInvestment, addInvestment }}>
      {children}
    </InvestmentContext.Provider>
  )
}

// Hook that guarantees a non-undefined context value
export const useInvestmentContext = (): InvestmentContextType => {
  const ctx = useContext(InvestmentContext)
  if (!ctx) {
    throw new Error('useInvestmentContext must be used within InvestmentContextProvider')
  }
  return ctx
}

