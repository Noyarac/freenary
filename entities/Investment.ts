import { InvestmentType } from "@/types/InvestmentType"
import { Column, Entity, OneToMany, PrimaryColumn, TableInheritance } from "typeorm"
import { EventType } from "@/types/EventType"

@Entity()
@TableInheritance({ pattern: "STI", column: { type: "varchar", enum: InvestmentType, name: "type"} })
export default class Investment {
    @PrimaryColumn() id!: number
    @Column() name!: string
    @Column({ nullable: true}) frequency!: number
    @OneToMany("Event", (event: any) => event.investment)
    events!: any[]
    selected = true

    getInvested() {
        return this.events
            .filter(event => event.type === EventType.MOVEMENT)
            .reduce((prev, cur) => prev += cur.amount, 0) / 100
    }

    getName() {
        return this.name
    }
}