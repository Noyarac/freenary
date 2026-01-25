import { ChildEntity, Column } from "typeorm"
import Investment from "@/entities/Investment"
import StockService, { StockServiceObject } from "@/services/StockService"

@ChildEntity()
export default class Stock extends Investment {
    @Column() ticker!: string

    getService(): StockServiceObject {
        return StockService(this)
    }
}