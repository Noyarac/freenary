import { getRepository } from "@/configurations/ormConfig"
import Investment from "@/entities/Investment"
import Movement from "@/entities/Movement"
import { InvestmentDTO } from "@/types/InvestmentDTO"

export interface InvestmentServiceObject {
    getInvested(): number
    getName(): string
    getValue(): Promise<number>
    getQuantity(): Promise<number>
}

export async function getJsonForAll() {
    const investmentRepository = await getRepository(Investment)
    const investments = await investmentRepository.find()
    const responseObject: InvestmentDTO[] = await Promise.all(investments.map(async investment => Object.assign({
        type: investment.constructor.name,
        invested: investment.getService().getInvested(),
        name: investment.getService().getName(),
        value: await investment.getService().getValue(),
        selected: true,
    }, investment)))
    return responseObject
}

function InvestmentService(investment: Investment) {
    return {
        getInvested(): number {
            return investment.movements
                .reduce((previous, current) => {
                    return { price: previous.price + current.price } as Movement
                }, { price: 0 } as Movement)
                .price
        },

        async getQuantity() {
            return investment.movements
                .reduce((previous, current) => {
                    return { quantity: previous.quantity + current.quantity } as Movement
                }, { quantity: 0 } as Movement)
                .quantity
        },

        getName() {
            return investment.name
        },

        async getValue() {
            return 1
        }
    } as InvestmentServiceObject
}
export default InvestmentService