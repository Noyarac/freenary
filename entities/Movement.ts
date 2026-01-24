import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import type Investment from "@/entities/Investment"

@Entity()
export default class Movement {
    @PrimaryGeneratedColumn() id!: number
    @Column() date!: Date
    @Column() quantity!: number
    @Column() price!: number
    @ManyToOne("Investment", (investment: Investment) => investment.movements, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn()
    investment!: Investment

    static fromJSON(obj: any) {
        obj.date = new Date(obj.date)
        return Object.assign(new Movement(), obj)
    }
        
}