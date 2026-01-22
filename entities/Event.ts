import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm"
import { EventType } from "@/types/EventType"
import Investment from "@/entities/Investment"

@Entity()
export default class Event {
    static fromJSON(obj: any) {
        return Object.assign(new Event(), obj)
    }
        
    @PrimaryColumn() id!: number
    @Column() date!: Date
    @Column() amount!: number
    @Column({ type: 'varchar', enum: EventType}) type!: EventType
    @ManyToOne(() => Investment, (investment: Investment) => investment.events, { nullable: false, onDelete: "CASCADE" })
    investment!: Investment
}