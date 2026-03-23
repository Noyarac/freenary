"use client"

import { createContext, ReactNode, useContext, useState } from "react"

type ToastLevel = "info" | "error" | "success"

type ToastContextType = {
  setToast: (data: { message: string, level: ToastLevel }) => void,
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastContextProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("")
  const [className, setClassName] = useState("invisible")
  const setToast = (data: { message: string, level: ToastLevel }) => {
    setMessage(data.message)
    setClassName(`${data.level} visible`)
    setTimeout(() => setClassName(data.level), 5000)
  }

  return (
    <ToastContext.Provider value={{ setToast }}>
      {children}
      <div id="toast" className={className}>{ message }</div>
    </ToastContext.Provider>
  )
}

// Hook that guarantees a non-undefined context value
export const useToastContext = (): ToastContextType => {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToastContext must be used within ToastContextProvider')
  }
  return ctx
}

