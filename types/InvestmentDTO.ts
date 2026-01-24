import Investment from "@/entities/Investment";

type InvestmentProperties = {
    [K in keyof Investment as Investment[K] extends Function ? never : K]: Investment[K]
}

export interface InvestmentDTO extends InvestmentProperties {
    type: string
    selected: boolean
    invested: number
    value: number
}