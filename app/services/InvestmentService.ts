import Event from "@/entities/Event"
import Investment from "@/entities/Investment"
import Scpi from "@/entities/Scpi"
import Stock from "@/entities/Stock"
import { EventType } from "@/types/EventType"
import { InvestmentType } from "@/types/InvestmentType"

const InvestmentService = {
    getClassByName: (className: string): typeof Investment => {
        switch (className) {
            case InvestmentType.Scpi:
                return Scpi
            case InvestmentType.Stock:
                return Stock
            default:
                return Investment
        }
    },

    createInvestment: (obj: any) => {
        const SubClass = InvestmentService.getClassByName(obj.type)
        const instance = Object.assign(new SubClass(), obj)
        instance.events = obj.events?.map((e: any) => (Event.fromJSON(e))) ?? []
        instance.events.map((event: any) => event.type = EventType[event.type])
        return instance
    }
}
export default InvestmentService