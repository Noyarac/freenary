import { InvestmentType } from "@/types/InvestmentType"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, TableInheritance } from "typeorm"
import type Distribution from "@/entities/Distribution"
import type Movement from "@/entities/Movement"
import InvestmentService, { InvestmentServiceObject } from "@/services/InvestmentService"

@Entity()
@TableInheritance({ pattern: "STI", column: { type: "varchar", enum: InvestmentType, name: "type"} })
export default class Investment {
    @PrimaryGeneratedColumn() id!: number
    @Column() name!: string
    @Column({ nullable: true}) frequency!: number
    @OneToMany("Movement", (movement: Movement) => movement.investment, { cascade: true, eager: true}) movements!: Movement[]
    @OneToMany("Distribution", (distribution: Distribution) => distribution.investment, { cascade: true, eager: true}) distributions!: Distribution[]

    getService(): InvestmentServiceObject {
        return InvestmentService(this)
    }
}