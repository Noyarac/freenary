import { EventType } from "@/types/EventType";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import type Investment from "./Investment";

@Entity({ name : 'events'})
export default class Event {
    static fromJSON(obj: any) {
        return Object.assign(new Event(), obj)
    }
        
    @PrimaryColumn() id!: number
    @Column() date!: Date
    @Column() amount!: number
    @Column({ type: 'varchar', enum: EventType}) type!: EventType
    @ManyToOne(() => require("./Investment").default, (investment: Investment) => investment.events, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "investment_id"})
    investment!: Investment
}