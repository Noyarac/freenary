import { ChildEntity, Column } from "typeorm"
import { EventType } from "@/types/EventType"
import Investment from "./Investment"

@ChildEntity()
export default class Scpi extends Investment {
    @Column() organism!: string
    @Column() delay!: number

    getInvested() {
        return this.events
            .filter(event => event.type === EventType.MOVEMENT)
            .reduce((prev, cur) => prev += cur.amount, 0) / 100
    }

    getName(): string {
        return `${this.organism} ${this.name}`
    }
}