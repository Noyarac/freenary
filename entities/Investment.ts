import InvestmentSubType from "@/types/InvestmentSubType"
import { Column, Entity, OneToMany, PrimaryColumn, TableInheritance } from "typeorm"
import type Movement from "@/entities/Movement"
import Split from "./Split"

@Entity({ name: "Investment" })
@TableInheritance({ pattern: "STI", column: { type: "varchar", enum: InvestmentSubType, name: "type"} })
export default class Investment {
    @PrimaryColumn() id!: string
    @Column() enableDividend!: boolean
    @OneToMany("Movement", "investment", { cascade: true, eager: true}) movements!: Movement[]
    @OneToMany("Split", "investment", { cascade: true, eager: true}) splits!: Split[]
}
