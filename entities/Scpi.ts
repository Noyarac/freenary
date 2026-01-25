import { ChildEntity, Column } from "typeorm"
import Investment from "@/entities/Investment"
import ScpiService, { ScpiServiceObject } from "@/services/ScpiService"
import { ScpiCacheObject } from "@/types/ScpiCache"

@ChildEntity()
export default class Scpi extends Investment {
    @Column() organism!: string
    @Column() delay!: number
    @Column() scpiLabId!: number
    _cache?: ScpiCacheObject[]

    getService(): ScpiServiceObject {
        return ScpiService(this)
    }
}