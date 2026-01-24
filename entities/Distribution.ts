import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import type Investment from "@/entities/Investment"

@Entity()
export default class Distribution {
    @PrimaryGeneratedColumn() id!: number
    @Column() date!: Date
    @Column() amount!: number
    @ManyToOne("Investment", (investment: Investment) => investment.distributions, { nullable: false, onDelete: "CASCADE" })
    investment!: Investment

    static fromJSON(obj: any) {
        obj.date = new Date(obj.date)
        return Object.assign(new Distribution(), obj)
    }
        
}