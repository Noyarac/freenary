import { getRepository } from "@/configurations/ormConfig"
import Investment from "@/entities/Investment"
import Movement from "@/entities/Movement"
import Stock from "@/entities/Stock"
import { InvestmentDTO } from "@/types/InvestmentDTO"

export interface InvestmentServiceObject {
    getInvested(): number
    getName(): string
    getValue(): Promise<number>
    _getQuantity(): Promise<number>
    _getUnitValue(): Promise<number>
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
        getName() {
            return investment.name
        },

        getInvested(): number {
            return investment.movements
                .reduce((previous, current) => {
                    return { price: previous.price + current.price } as Movement
                }, { price: 0 } as Movement)    
                .price
        },        

        async getValue() {
            return await this._getQuantity() * await this._getUnitValue()
        },

        async _getQuantity() {
            return investment.movements
                .reduce((previous, current) => {
                    return { quantity: previous.quantity + current.quantity } as Movement
                }, { quantity: 0 } as Movement)        
                .quantity
        },                

        async _getUnitValue() {
            return 1
        }
    } as InvestmentServiceObject
}
export default InvestmentService