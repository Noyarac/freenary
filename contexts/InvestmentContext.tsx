"use client"

import InvestmentDTO from "@/types/InvestmentDTO"
import MovementDTO from "@/types/MovementDTO"
import SplitDTO from "@/types/SplitDTO"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"

type InvestmentContextType = {
  investments: InvestmentDTO[]
  toggleSelected: (ids: string[]) => void
  removeInvestment: (id: string) => void
  addInvestment: (id: string) => Promise<void>
  removeMovement: (investmentId: string, movementId: number) => void
  addMovement: (movement: MovementDTO) => void
  addSplit: (split: SplitDTO) => void
  removeSplit: (investmentId: string, splitId: number) => void
}
const InvestmentContext = createContext<InvestmentContextType | undefined>(undefined)

export function InvestmentContextProvider({ children }: { children: ReactNode }) {
  const [investments, setInvestments] = useState<InvestmentDTO[]>([])

  const updateInvestmentBasic = async () => {
    const responseBasicAll = await fetch("/api/investment/")
    const investmentsBasicAll = ((await responseBasicAll.json()) as InvestmentDTO[])
      .map(inv => ({ ...inv, selected: true, movements: inv.movements.map(mov => {mov.date = typeof mov.date === "string" ? new Date(mov.date as unknown as string) : mov.date; return mov}), splits: inv.splits.map(split => {split.date = typeof split.date === "string" ? new Date(split.date as unknown as string) : split.date; return split}) }))
    setInvestments(investmentsBasicAll)
    return investmentsBasicAll
  }

  const updateInvestmentDetailed = async (investment: InvestmentDTO) => {
    const invRes = await fetch(`/api/investment/?detailed=true&ids=${investment.id}`)
    const invJson = (await invRes.json()).pop()
    setInvestments(prev =>
      prev.map(inv => (inv.id === invJson.id ? { ...inv, ...invJson, movements: inv.movements, splits: inv.splits } : inv))
    )
  }

  useEffect(() => {
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
        if (inv.id === investementId) {
          inv.movements = inv.movements.filter(mov => mov.id !== movementId)
          updateInvestmentDetailed({id: investementId} as InvestmentDTO)
        }
        return inv
      })
    )
  }

  const removeSplit = (investementId: string, splitId: number) => {
    setInvestments(prev =>
      prev.map(inv => {
        if (inv.id === investementId) {
          inv.splits = inv.splits.filter(split => split.id !== splitId)
          updateInvestmentDetailed({id: investementId} as InvestmentDTO)
        }
        return inv
      })
    )
  }

  const addMovement = (movement: MovementDTO) => {
    setInvestments(prev =>
      prev.map(inv => {
        if (inv.id === movement.investmentId) inv.movements.push(movement) && updateInvestmentDetailed({id: movement.investmentId} as InvestmentDTO)
        return inv
      })
    )
  }

  const addSplit = (split: SplitDTO) => {
    setInvestments(prev =>
      prev.map(inv => {
        if (inv.id === split.investmentId) inv.splits.push(split) && updateInvestmentDetailed({id: split.investmentId} as InvestmentDTO)
        return inv
      })
    )
  }

  const addInvestment = async (id: string) => {
    const invRes = await fetch(`/api/investment/?detailed=true&ids=${id}`)
    const invJson = (await invRes.json()).pop()
    invJson.movements = invJson.movements.map((mov: any) => { mov.date = typeof mov.date === "string" ? new Date(mov.date) : mov.date; return mov})
    invJson.splits = invJson.splits.map((split: any) => { split.date = typeof split.date === "string" ? new Date(split.date) : split.date; return split})
    const existingInvestement = investments.find(investment => investment.id === id)
    invJson.selected = existingInvestement ? existingInvestement.selected : true
    setInvestments(prev =>
      [...(prev.filter(inv => inv.id !== id)), invJson]
    )
  }

  return (
    <InvestmentContext.Provider value={{ investments, toggleSelected, removeInvestment, addInvestment, removeMovement, addMovement, addSplit, removeSplit }}>
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

