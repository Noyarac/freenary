import { ChildEntity } from "typeorm"
import { EventType } from "@/types/EventType"
import Investment from "./Investment"

@ChildEntity()
export default class Stock extends Investment {
    getInvested() {
        return this.events
            .filter(event => event.type === EventType.MOVEMENT)
            .reduce((prev, cur) => prev += cur.amount, 0) / 100
    }
}