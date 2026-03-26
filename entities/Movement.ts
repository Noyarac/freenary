import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import Investment from "@/entities/Investment"

@Entity({ name: "Movement" })
export default class Movement {
    @PrimaryGeneratedColumn() id!: number
    @Column() date!: Date
    @Column() quantity!: number
    @Column() price!: number
    @ManyToOne(() => Investment, "movements", { nullable: false, onDelete: "CASCADE" })
    @JoinColumn()
    investment!: Investment
}