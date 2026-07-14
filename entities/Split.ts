import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import type Investment from "@/entities/Investment"

@Entity({ name: "Split" })
export default class Split {
    @PrimaryGeneratedColumn() id!: number
    @Column() date!: Date
    @Column() ratio!: number
    @ManyToOne("Investment", "splits", { nullable: false, onDelete: "CASCADE" })
    @JoinColumn()
    investment!: Investment
}