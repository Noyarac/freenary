import InvestmentSubType from "@/types/InvestmentSubType"
import { Entity, OneToMany, PrimaryColumn, TableInheritance } from "typeorm"
import type Movement from "@/entities/Movement"


@Entity()
@TableInheritance({ pattern: "STI", column: { type: "varchar", enum: InvestmentSubType, name: "type"} })
export default class Investment {
    @PrimaryColumn() id!: string
    @OneToMany("Movement", (movement: Movement) => movement.investment, { cascade: true, eager: true}) movements!: Movement[]
}
