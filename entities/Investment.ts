import { InvestmentType } from "@/types/InvestmentType"
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import Event from "./Events"
import { EventType } from "@/types/EventType"

@Entity({ name: 'investments' })
export default class Investment {
    static fromJSON(obj: any): Investment {
        const inv = Object.assign(new Investment(), obj)
        inv.events = obj.events?.map((e: any) => (Event.fromJSON(e))) ?? []
        inv.events.map((event: any) => event.type = EventType[event.type])
        return inv;
    }

    @PrimaryColumn() id!: number
    @Column() organism!: string
    @Column() name!: string
    @Column() frequency!: number
    @Column() delay!: number
    @Column({ type: 'varchar', enum: InvestmentType }) type!: InvestmentType
    @OneToMany(() => require("./Events").default, (event: Event) => event.investment)
    events!: Event[]
    selected = true

    getInvested() {
        return this.events
            .filter(event => event.type === EventType.MOVEMENT)
            .reduce((prev, cur) => prev += cur.amount, 0) / 100
    }
}