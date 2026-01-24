import { ChildEntity } from "typeorm"
import Investment from "@/entities/Investment"

@ChildEntity()
export default class Stock extends Investment {
}