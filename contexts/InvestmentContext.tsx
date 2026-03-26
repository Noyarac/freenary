"use client"

import InvestmentDTO from "@/types/InvestmentDTO"
import MovementDTO from "@/types/MovementDTO"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"

type InvestmentContextType = {
  investments: InvestmentDTO[]
  toggleSelected: (ids: string[]) => void
  removeInvestment: (id: string) => void
  addInvestment: (id: string) => void
  removeMovement: (investmentId: string, movementId: number) => void
  addMovement: (movement: MovementDTO) => void
}
const InvestmentContext = createContext<InvestmentContextType | undefined>(undefined)

export function InvestmentContextProvider({ children }: { children: ReactNode }) {
  const [investments, setInvestments] = useState<InvestmentDTO[]>([])

  useEffect(() => {
    const updateInvestmentBasic = async () => {
      const responseBasicAll = await fetch("/api/investment/")
      const investmentsBasicAll = ((await responseBasicAll.json()) as InvestmentDTO[])
        .map(inv => ({ ...inv, selected: true, movements: inv.movements.map(mov => {mov.date = typeof mov.date === "string" ? new Date(mov.date as unknown as string) : mov.date; return mov}) }))
      setInvestments(investmentsBasicAll)
      return investmentsBasicAll
    }

    const updateInvestmentDetailed = async (investment: InvestmentDTO) => {
      const invRes = await fetch(`/api/investment/?detailed=true&ids=${investment.id}`)
      const invJson = (await invRes.json()).pop()
      setInvestments(prev =>
        prev.map(inv => (inv.id === invJson.id ? { ...inv, ...invJson, movements: inv.movements } : inv))
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

  const removeMovement = (investementId: string, movementId: number) => {
    setInvestments(prev =>
      prev.map(inv => {
        if (inv.id === investementId) inv.movements = inv.movements.filter(mov => mov.id !== movementId)
        return inv
      })
    )
  }

  const addMovement = (movement: MovementDTO) => {
    setInvestments(prev =>
      prev.map(inv => {
        if (inv.id === movement.investmentId) inv.movements.push(movement)
        return inv
      })
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
    <InvestmentContext.Provider value={{ investments, toggleSelected, removeInvestment, addInvestment, removeMovement, addMovement }}>
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

