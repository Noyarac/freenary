enum InvestmentSubType {
  Scpi = "Scpi",
  Stock = "Stock",
  Livret = "Livret",
}
export default InvestmentSubType

export type InvestmentSubTypeName = keyof typeof InvestmentSubType